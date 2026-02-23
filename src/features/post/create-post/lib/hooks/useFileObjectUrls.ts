import { useEffect, useRef, useState } from 'react';

export const useFileObjectUrls = (files: File[]): string[] => {
  const urlsToRevokeRef = useRef<string[]>([]);
  const [urls, setUrls] = useState<string[]>(() => {
    const initial = files.map((file) => URL.createObjectURL(file));
    urlsToRevokeRef.current = initial;
    return initial;
  });

  useEffect(() => {
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setUrls(newUrls);
    const prev = urlsToRevokeRef.current;
    urlsToRevokeRef.current = newUrls;
    prev.forEach((url) => URL.revokeObjectURL(url));
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
      urlsToRevokeRef.current = [];
    };
  }, [files]);

  return urls;
};
