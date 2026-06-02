'use client';

import { usersControllerGetTotalCount } from '@/shared/api/generated/endpoints/core/users/users';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { useQuery } from '@tanstack/react-query';

export const useRegisteredUsersCountQuery = () => {
  return useQuery({
    queryKey: mainPageKeys.registeredUsersCount(),
    queryFn: () => usersControllerGetTotalCount(),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchIntervalInBackground: false,
    meta: { skipGlobalLoader: true },
  });
};
