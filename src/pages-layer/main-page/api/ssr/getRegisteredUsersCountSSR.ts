import 'server-only';

import { unstable_cache } from 'next/cache';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { usersControllerGetTotalCount } from '@/shared/api/generated/endpoints/core/users/users';

export const getRegisteredUsersCountSSR = unstable_cache(
  async () => usersControllerGetTotalCount(),
  [...mainPageKeys.registeredUsersCount()],
  { revalidate: 60 },
);
