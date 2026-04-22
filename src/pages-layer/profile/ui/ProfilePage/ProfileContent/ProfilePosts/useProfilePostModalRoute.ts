'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';
import { getProfilePostRoute } from '@/shared/lib/routes/getProfilePostRoute';

type Params = {
  profileId: string;
};

export const useProfilePostModalRoute = ({ profileId }: Params) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const postId = searchParams.get('postId');

  const openPost = (targetPostId: string) => {
    router.push(getProfilePostRoute({ postId: targetPostId, profileId }), {
      scroll: false,
    });
  };

  const closePost = () => {
    router.push(from === 'main' ? ROUTES.HOME : ROUTES.PROFILE(profileId), {
      scroll: false,
    });
  };

  return {
    closePost,
    openPost,
    postId,
  };
};
