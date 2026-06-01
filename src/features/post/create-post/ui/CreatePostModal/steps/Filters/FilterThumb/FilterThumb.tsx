import { getFilterStyle } from '@/features/post/create-post/lib';
import { clsx } from 'clsx';
import Image from 'next/image';
import styles from './FilterThumb.module.css';

type Props = {
  id: string;
  label: string;
  imageUrl: string;
  isSelected: boolean;
  onSelect: () => void;
};

export const FilterThumb = ({
  id,
  label,
  imageUrl,
  isSelected,
  onSelect,
}: Props) => (
  <button
    type="button"
    className={clsx(styles.thumb, isSelected && styles.thumbSelected)}
    onClick={onSelect}
    aria-label={label}
    aria-pressed={isSelected}
  >
    <span className={styles.imageWrap}>
      <Image
        src={imageUrl}
        alt=""
        className={styles.image}
        fill
        unoptimized
        style={{ filter: getFilterStyle(id), objectFit: 'cover' }}
        draggable={false}
      />
    </span>
    <span className={styles.label}>{label}</span>
  </button>
);
