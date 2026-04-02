/** UI-модель списка; при интеграции с бекендом сопоставьте с DTO / Orval. */
export type SocialListUser = {
  id: number;
  username: string;
  avatar: string;
  isFollowing: boolean;
  /** Followers list: show "Delete" to remove this follower */
  canRemoveFollower?: boolean;
};

export type SocialListResponse = {
  totalCount: number;
  items: SocialListUser[];
};
