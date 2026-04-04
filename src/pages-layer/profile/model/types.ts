export type Post = {
  id: string;
  profileId: string;
  mediaCount: number;
  medias: {
    id: string;
    url: string;
  }[];
};
