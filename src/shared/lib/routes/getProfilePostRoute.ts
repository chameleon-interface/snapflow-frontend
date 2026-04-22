import { ROUTES } from '@/shared/config/routes';

type Params = {
  from?: 'main';
  postId: string;
  profileId: string;
};

export const getProfilePostRoute = ({ from, postId, profileId }: Params) => {
  const searchParams = new URLSearchParams({ postId });

  if (from) {
    searchParams.set('from', from);
  }

  return `${ROUTES.PROFILE(profileId)}?${searchParams.toString()}`;
};
