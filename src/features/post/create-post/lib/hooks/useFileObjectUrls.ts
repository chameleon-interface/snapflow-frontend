import { useEffect, useRef, useState } from 'react';

export const useFileObjectUrls = (files: File[]): string[] => {
  const urlsToRevokeRef = useRef<string[]>([]);
  const [urls, setUrls] = useState<string[]>(() =>
    files.map((file) => URL.createObjectURL(file)),
  );

  useEffect(() => {
    urlsToRevokeRef.current = urls;
    // Intentionally run once to capture initial URLs for later revoke
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newUrls = files.map((file) => URL.createObjectURL(file));
    const prev = urlsToRevokeRef.current;
    urlsToRevokeRef.current = newUrls;
    prev.forEach((url) => URL.revokeObjectURL(url));
    queueMicrotask(() => setUrls(newUrls));
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
      urlsToRevokeRef.current = [];
    };
  }, [files]);

  return urls;
};
