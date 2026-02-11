import s from './MainPage.module.css';
import { PostCard } from '@/pages-layer/MainPage/ui/PostCard/PostCard';

type Post = {
  id: string;
  author: string;
  description: string;
  images: string[];
  createdAt: string;
  avatarUrl: string;
};

type Props = {
  usersCount: number;
  posts: Post[];
};

export function MainPage({ usersCount, posts }: Props) {
  return (
    <div className={s.root}>
      <section className={s.users}>
        <span className={s.usersLabel}>Registered users:</span>
        <span className={s.counter}>
          {String(usersCount)
            .split('')
            .map((digit, i) => (
              <span key={i} className={s.digit}>
                {digit}
              </span>
            ))}
        </span>
      </section>

      <section className={s.posts}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
