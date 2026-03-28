'use client';

import { useIsFetching } from '@tanstack/react-query';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import s from './SplashScreen.module.css';

const BRAND_NAME = 'Snapflow';
const AUTH_ME_QUERY_KEY = ['auth', 'me'] as const;
const TYPEWRITER_STEP_MS = 120;
const FADE_OUT_MS = 500;
const DOTS_HIDE_BEFORE_FADE_MS = 620;
const NO_TIMER = null;
type TimerRef = { current: number | null };

const clearTimeoutRef = (timerRef: TimerRef) => {
  if (timerRef.current !== NO_TIMER) {
    window.clearTimeout(timerRef.current);
    timerRef.current = NO_TIMER;
  }
};

const clearIntervalRef = (timerRef: TimerRef) => {
  if (timerRef.current !== NO_TIMER) {
    window.clearInterval(timerRef.current);
    timerRef.current = NO_TIMER;
  }
};

export const SplashScreenGate = ({ children }: PropsWithChildren) => {
  const [typedText, setTypedText] = useState('');
  const [isTypewriterDone, setIsTypewriterDone] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const activeRequestsCount = useIsFetching({ queryKey: AUTH_ME_QUERY_KEY });
  const isInitialLoadDone = activeRequestsCount === 0;
  const showLoadingDots = isTypewriterDone && !isInitialLoadDone;
  const canHideSplash = isTypewriterDone && isInitialLoadDone;

  const typewriterTimerRef = useRef<number | null>(null);
  const startFadeTimerRef = useRef<number | null>(null);
  const hideSplashTimerRef = useRef<number | null>(null);
  const hasShownLoadingDotsRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    if (showLoadingDots) {
      hasShownLoadingDotsRef.current = true;
    }
  }, [showLoadingDots]);

  useEffect(() => {
    isMountedRef.current = true;

    let index = 0;

    typewriterTimerRef.current = window.setInterval(() => {
      index += 1;
      setTypedText(BRAND_NAME.slice(0, index));

      if (index >= BRAND_NAME.length) {
        clearIntervalRef(typewriterTimerRef);
        setIsTypewriterDone(true);
      }
    }, TYPEWRITER_STEP_MS);

    return () => {
      isMountedRef.current = false;
      clearIntervalRef(typewriterTimerRef);
      clearTimeoutRef(startFadeTimerRef);
      clearTimeoutRef(hideSplashTimerRef);
    };
  }, []);

  useEffect(() => {
    if (!canHideSplash || !isSplashVisible) {
      clearTimeoutRef(startFadeTimerRef);
      clearTimeoutRef(hideSplashTimerRef);
      return;
    }

    const delayBeforeFade = hasShownLoadingDotsRef.current
      ? DOTS_HIDE_BEFORE_FADE_MS
      : 0;

    startFadeTimerRef.current = window.setTimeout(() => {
      if (!isMountedRef.current) {
        return;
      }

      setIsFadingOut(true);
      hideSplashTimerRef.current = window.setTimeout(() => {
        if (isMountedRef.current) {
          setIsSplashVisible(false);
        }
      }, FADE_OUT_MS);
    }, delayBeforeFade);

    return () => {
      clearTimeoutRef(startFadeTimerRef);
      clearTimeoutRef(hideSplashTimerRef);
    };
  }, [canHideSplash, isSplashVisible]);

  return (
    <>
      {children}
      {isSplashVisible ? (
        <div className={`${s.overlay} ${isFadingOut ? s.fadeOut : ''}`}>
          <h1 className={s.title}>
            {typedText}
            <span
              className={`${s.loadingDots} ${showLoadingDots ? s.loadingDotsVisible : ''}`}
              aria-hidden="true"
            >
              <span className={s.dot}>.</span>
              <span className={s.dot}>.</span>
              <span className={s.dot}>.</span>
            </span>
            <span className={s.cursor} aria-hidden="true" />
          </h1>
        </div>
      ) : null}
    </>
  );
};
