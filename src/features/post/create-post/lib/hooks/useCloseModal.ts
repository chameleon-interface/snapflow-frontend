import { useCallback, useState } from 'react';

type Params = {
  hasUnsavedContent: boolean;
  doClose: () => void;
};

export const useCloseModal = ({ hasUnsavedContent, doClose }: Params) => {
  const [isCloseModalOpened, setIsCloseModalOpened] = useState(false);

  const handleCloseRequest = useCallback(() => {
    if (hasUnsavedContent) {
      setIsCloseModalOpened(true);
      return;
    }
    doClose();
  }, [hasUnsavedContent, doClose]);

  return {
    isCloseModalOpened,
    setIsCloseModalOpened,
    handleCloseRequest,
  };
};
