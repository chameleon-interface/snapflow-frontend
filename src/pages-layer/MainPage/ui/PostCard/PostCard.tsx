'use client';
import { useState } from 'react';
import s from './../MainPage.module.css';
import { ArrowLeftIcon, ArrowRightIcon } from 'snapflow-ui-kit/icons';
import Image from 'next/image';

type Props = {
  post: {
    id: string;
    author: string;
    avatarUrl: string;
    description: string;
    images: string[];
    createdAt: string;
  };
};

export function PostCard({ post }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const hasMultipleImages = post.images.length > 1;
  const previewText =
    !expanded && post.description.length > 74
      ? post.description.slice(0, 74) + '...'
      : post.description;

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % post.images.length);
  const prevImage = () =>
    setCurrentImage(
      (prev) => (prev - 1 + post.images.length) % post.images.length,
    );

  const maxDots = 5;
  const totalDots = Math.min(post.images.length, maxDots);

  return (
    <article className={s.card}>
      {/* IMAGE CAROUSEL */}
      <div className={s.imageWrapper}>
        <Image
          src={post.images[currentImage]}
          alt={post.description}
          fill
          className={s.image}
        />

        {hasMultipleImages && !expanded && (
          <>
            <button className={s.prevArrow} onClick={prevImage}>
              <ArrowLeftIcon />
            </button>
            <button className={s.nextArrow} onClick={nextImage}>
              <ArrowRightIcon />
            </button>

            <div className={s.dots}>
              {Array.from({ length: totalDots }).map((_, idx) => {
                // Если картинок > 5 и текущая картинка после пятой, активная последняя точка
                const isActive =
                  post.images.length > maxDots && currentImage >= maxDots
                    ? idx === maxDots - 1
                    : idx === currentImage;
                return (
                  <span
                    key={idx}
                    className={`${s.dot} ${isActive ? s.activeDot : ''}`}
                    onClick={() => {
                      // При клике по точке, выбираем соответствующую картинку
                      if (
                        post.images.length > maxDots &&
                        idx === maxDots - 1 &&
                        currentImage >= maxDots
                      ) {
                        setCurrentImage(maxDots); // переход на шестую картинку
                      } else {
                        setCurrentImage(idx);
                      }
                    }}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* META */}
      <div className={s.user}>
        <Image
          className={s.avatar}
          src={post.avatarUrl}
          alt={post.author}
          width={24}
          height={24}
        />
        <span className={s.username}>{post.author}</span>
      </div>
      <span className={s.time}>{post.createdAt}</span>

      {/* TEXT PREVIEW */}
      <p className={s.textPreview}>
        {previewText}
        {!expanded && post.description.length > 44 && (
          <button className={s.moreInline} onClick={() => setExpanded(true)}>
            Show more
          </button>
        )}
      </p>

      {/* OVERLAY */}
      {expanded && (
        <div className={s.overlay}>
          <div className={s.overlayHeader}>
            <Image
              className={s.avatar}
              src={post.avatarUrl}
              alt={post.author}
              width={24}
              height={24}
            />
            <span className={s.username}>{post.author}</span>
          </div>
          <div className={s.overlayTime}>{post.createdAt}</div>
          <p className={s.overlayText}>
            {post.description}
            <button className={s.moreInline} onClick={() => setExpanded(false)}>
              Hide
            </button>
          </p>
        </div>
      )}
    </article>
  );
}
