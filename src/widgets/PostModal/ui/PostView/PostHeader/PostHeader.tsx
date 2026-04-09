'use client';

import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import { DropdownMenu } from 'snapflow-ui-kit/client';
import { EditIcon, MoreHozitontalIcon, TrashIcon } from 'snapflow-ui-kit/icons';
import { Typography } from 'snapflow-ui-kit';
import { UserAvatar } from '@/shared/ui/UserAvatar';
import styles from './PostHeader.module.css';

type Props = {
  isOwner: boolean;
  ownerAvatarUrl: string | null;
  ownerUsername: string;
  onDelete: () => void;
  onEdit: () => void;
};

export const PostHeader = ({
  isOwner,
  ownerAvatarUrl,
  ownerUsername,
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
      <div className={styles.author}>
        <UserAvatar
          avatarUrl={ownerAvatarUrl}
          size={36}
          username={ownerUsername}
        />
        <Typography variant="text-16-bold">{ownerUsername}</Typography>
      </div>
      {isOwner ? (
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
