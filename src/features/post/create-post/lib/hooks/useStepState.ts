'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  CREATE_POST_STEPS,
  type CreatePostStep,
} from '@/features/post/create-post/model/types';

const STEPS = CREATE_POST_STEPS;

type Params = {
  selectedPhotosLength: number;
};

export const useStepState = ({ selectedPhotosLength }: Params) => {
  const [step, setStep] = useState<CreatePostStep>('addPhotos');

  useEffect(() => {
    if (selectedPhotosLength > 0 && step === 'addPhotos') {
      setStep('cropping');
    }
  }, [selectedPhotosLength, step]);

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
