let accessToken: string | null = null;
// let refreshPromise: Promise<string> | null = null;

export const tokenService = {
  get: () => accessToken,

  set: (token: string) => {
    accessToken = token;
  },

  remove: () => {
    accessToken = null;
  },

  // getRefreshPromise: () => refreshPromise,
  // setRefreshPromise: (promise: Promise<string> | null) => {
  //   refreshPromise = promise;
  // },
};
