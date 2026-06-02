import type { PostViewDto } from '@/shared/api/generated/model/core';
import Image from 'next/image';
import { Typography } from 'snapflow-ui-kit';
import { Carousel } from 'snapflow-ui-kit/client';
import styles from './PostCardMedia.module.css';

type PostMedia = PostViewDto['postMedias'][number];

type Props = {
  getMediaAltAction: (current: number, total: number) => string;
  mediaUnavailableText: string;
  postImages: PostMedia[];
};

export const PostCardMedia = ({
  getMediaAltAction,
  mediaUnavailableText,
  postImages,
}: Props) => {
  const hasMedia = postImages.length > 0;

  return (
    <div className={styles.mediaWrap}>
      {hasMedia ? (
        <Carousel className={styles.carousel} hideArrowsWhenSingle>
          {postImages.map((media, index) => (
            <div key={media.postMediaId} className={styles.slide}>
              <Image
                src={media.url}
                alt={getMediaAltAction(index + 1, postImages.length)}
                fill
                sizes="(max-width: 768px) 100vw, 491px"
                className={styles.mediaImage}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className={styles.emptyMedia}>
          <Typography variant="text-14">{mediaUnavailableText}</Typography>
        </div>
      )}
    </div>
  );
};
