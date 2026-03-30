import type { ChangeEvent, RefObject } from 'react';

type HiddenFileInputProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  accept: string;
  multiple?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  tabIndex?: number;
  hidden?: boolean;
};

export const HiddenFileInput = ({
  inputRef,
  accept,
  multiple = false,
  onChange,
  className,
  tabIndex = -1,
  hidden = true,
}: HiddenFileInputProps) => {
  return (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      multiple={multiple}
      aria-hidden
      hidden={hidden}
      onChange={onChange}
      className={className}
      tabIndex={tabIndex}
    />
  );
};
