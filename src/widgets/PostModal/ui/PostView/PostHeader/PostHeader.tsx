'use client';

import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import { DropdownMenu } from 'snapflow-ui-kit/client';
import { EditIcon, MoreHozitontalIcon, TrashIcon } from 'snapflow-ui-kit/icons';
import { PostAuthor } from '../../PostAuthor';
import styles from './PostHeader.module.css';

type Props = {
  canManagePost: boolean;
  ownerAvatar: string | null;
  ownerName: string;
  onDelete: () => void;
  onEdit: () => void;
};

export const PostHeader = ({
  canManagePost,
  ownerAvatar,
  ownerName,
  onDelete,
  onEdit,
}: Props) => {
  const t = useTranslations('Modals.Post');
  const actionItems = [
    { icon: <EditIcon />, label: t('editAction'), onSelect: onEdit },
    { icon: <TrashIcon />, label: t('deleteAction'), onSelect: onDelete },
  ];

  return (
    <div className={styles.root}>
      <PostAuthor avatarUrl={ownerAvatar} username={ownerName} />
      {canManagePost ? (
        <DropdownMenu
          items={actionItems}
          align="end"
          className={styles.actionsMenu}
        >
          <Button
            variant="text"
            icon={<MoreHozitontalIcon />}
            className={styles.actionsButton}
            aria-label="Post actions"
          />
        </DropdownMenu>
      ) : null}
    </div>
  );
};
