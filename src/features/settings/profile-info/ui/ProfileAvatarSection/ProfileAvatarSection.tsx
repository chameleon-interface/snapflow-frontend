'use client';

import { Button, Typography } from 'snapflow-ui-kit';
import { ImageIcon } from 'snapflow-ui-kit/icons';
import s from './ProfileAvatarSection.module.css';

type ProfileAvatarSectionProps = {
  isMobile: boolean;
  label: string;
};

export const ProfileAvatarSection = ({
  isMobile,
  label,
}: ProfileAvatarSectionProps) => {
  return (
    <div className={s.photoColumn}>
      <div className={s.avatarPlaceholder} aria-hidden>
        <ImageIcon />
      </div>

      <Button type="button" variant="outlined" className={s.photoButton}>
        <Typography
          variant={isMobile ? 'text-14-bold' : 'h3'}
          className={s.photoButtonLabel}
        >
          {label}
        </Typography>
      </Button>
    </div>
  );
};
