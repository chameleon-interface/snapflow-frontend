'use client';

import type { CreatePostFlowState } from '@/features/post/create-post/lib/hooks/useFlow';
import { AddPhotos, Cropping, Filters, Publish } from '../steps';

type Props = CreatePostFlowState;

export const StepContent = (p: Props) => {
  if (p.step === 'addPhotos') {
    return (
      <AddPhotos
        selectedPhotos={p.selectedPhotos}
        setSelectedPhotos={p.setSelectedPhotos}
        draftExists={p.draftExists}
        isDraftLoading={p.isDraftLoading}
        onOpenDraft={p.onOpenDraft}
      />
    );
  }
  if (p.step === 'cropping') {
    return (
      <Cropping
        selectedPhotos={p.selectedPhotos}
        setSelectedPhotos={p.setSelectedPhotos}
        onPhotosEmpty={p.goToAddPhotos}
        currentSlideIndex={p.currentSlideIndex}
        setCurrentSlideIndex={p.setCurrentSlideIndex}
        cropAt={p.cropAt}
        zoomAt={p.zoomAt}
        aspectAt={p.aspectAt}
        onAspectSelect={p.handleAspectSelect}
        onRemovePhotoAt={p.removePhotoAt}
        onCropChange={p.handleCropChange}
        onZoomChange={p.handleZoomChange}
        onCropComplete={p.handleCropComplete}
      />
    );
  }
  if (p.step === 'filters') {
    return (
      <Filters
        photos={p.processedPhotos}
        currentIndex={p.currentSlideIndex}
        onSlideChange={p.setCurrentSlideIndex}
        filterAt={p.filterAt}
        onFilterSelect={p.handleFilterSelect}
      />
    );
  }
  if (p.step === 'publish') {
    return (
      <Publish
        photos={p.filteredPhotos}
        description={p.description}
        onDescriptionChange={p.setDescription}
        location={p.location}
        onLocationChange={p.setLocation}
        profile={p.profile}
      />
    );
  }
  return null;
};
