'use client';

import { useCallback, useState } from 'react';
import {
  CREATE_POST_STEPS,
  type CreatePostStep,
} from '@/features/post/create-post/model/types';

const STEPS = CREATE_POST_STEPS;

export const useStepState = () => {
  const [step, setStep] = useState<CreatePostStep>('addPhotos');

  const currentIndex = STEPS.indexOf(step);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === STEPS.length - 1;

  const goToAddPhotos = useCallback(() => setStep('addPhotos'), []);

  return {
    step,
    setStep,
    currentIndex,
    isFirstStep,
    isLastStep,
    goToAddPhotos,
    steps: STEPS,
  };
};
