'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Area } from 'react-easy-crop';
import type { CropPosition, DraftPostState } from '@/features/post/create-post/model/types';
import { reindexRecordAfterRemove } from '../utils/reindexRecordAfterRemove';
import {
  DEFAULT_ASPECT_INDEX,
  DEFAULT_CROP,
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
} from '../utils/constants';

const DEFAULT_FILTER_ID = 'normal';

type Params = {
  photoCount: number;
};

export const useCreatePostState = ({ photoCount }: Params) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [crops, setCrops] = useState<CropPosition[]>([]);
  const [zooms, setZooms] = useState<number[]>([]);
  const [croppedAreasPixels, setCroppedAreasPixels] = useState<(Area | null)[]>(
    []
  );
  const [aspectByIndex, setAspectByIndex] = useState<Record<number, number>>({});
  const [filterBySlide, setFilterBySlide] = useState<Record<number, string>>({});

  useEffect(() => {
    if (photoCount === 0) return;
    setCurrentSlideIndex((prev) => Math.min(prev, photoCount - 1));
  }, [photoCount]);

  const handleCropChange = useCallback((index: number, crop: CropPosition) => {
    setCrops((prev) => {
      const next = [...prev];
      next[index] = crop;
      return next;
    });
  }, []);

  const handleZoomChange = useCallback((index: number, zoom: number) => {
    setZooms((prev) => {
      const next = [...prev];
      next[index] = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
      return next;
    });
  }, []);

  const handleCropComplete = useCallback(
    (index: number, _area: Area, areaPixels: Area) => {
      setCroppedAreasPixels((prev) => {
        const next = [...prev];
        next[index] = areaPixels;
        return next;
      });
    },
    []
  );

  const handleAspectSelect = useCallback(
    (slideIndex: number, aspectIndex: number) => {
      setAspectByIndex((prev) => ({ ...prev, [slideIndex]: aspectIndex }));
    },
    []
  );

  const handleFilterSelect = useCallback((slideIndex: number, filterId: string) => {
    setFilterBySlide((prev) => ({ ...prev, [slideIndex]: filterId }));
  }, []);

  const removePhotoAt = useCallback((index: number) => {
    setCurrentSlideIndex((prev) =>
      prev >= index && prev > 0 ? prev - 1 : prev
    );
    setCrops((prev) => prev.filter((_, i) => i !== index));
    setZooms((prev) => prev.filter((_, i) => i !== index));
    setCroppedAreasPixels((prev) => prev.filter((_, i) => i !== index));
    setAspectByIndex((prev) => reindexRecordAfterRemove(prev, index));
    setFilterBySlide((prev) => reindexRecordAfterRemove(prev, index));
  }, []);

  const reset = useCallback(() => {
    setCurrentSlideIndex(0);
    setCrops([]);
    setZooms([]);
    setCroppedAreasPixels([]);
    setAspectByIndex({});
    setFilterBySlide({});
  }, []);

  const hydrate = useCallback((state: DraftPostState) => {
    setCurrentSlideIndex(state.currentSlideIndex);
    setCrops([...state.crops]);
    setZooms([...state.zooms]);
    setCroppedAreasPixels([...state.croppedAreasPixels]);
    setAspectByIndex({ ...state.aspectByIndex });
    setFilterBySlide({ ...state.filterBySlide });
  }, []);

  const getSnapshot = useCallback((): DraftPostState => ({
    currentSlideIndex,
    crops: [...crops],
    zooms: [...zooms],
    croppedAreasPixels: [...croppedAreasPixels],
    aspectByIndex: { ...aspectByIndex },
    filterBySlide: { ...filterBySlide },
  }), [currentSlideIndex, crops, zooms, croppedAreasPixels, aspectByIndex, filterBySlide]);

  const cropAt = (index: number) => crops[index] ?? DEFAULT_CROP;
  const zoomAt = (index: number) => zooms[index] ?? DEFAULT_ZOOM;
  const aspectAt = (index: number) =>
    aspectByIndex[index] ?? DEFAULT_ASPECT_INDEX;
  const filterAt = (index: number) => filterBySlide[index] ?? DEFAULT_FILTER_ID;

  return {
    currentSlideIndex,
    setCurrentSlideIndex,
    cropAt,
    zoomAt,
    aspectAt,
    filterAt,
    croppedAreasPixels,
    crops,
    zooms,
    aspectByIndex,
    filterBySlide,
    handleCropChange,
    handleZoomChange,
    handleAspectSelect,
    handleCropComplete,
    handleFilterSelect,
    removePhotoAt,
    reset,
    hydrate,
    getSnapshot,
  };
};
