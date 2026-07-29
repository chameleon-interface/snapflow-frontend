import { Typography } from 'snapflow-ui-kit';
import s from './NotificationList.module.css';

type NotificationListStateProps = {
  message: string;
};

export const NotificationListState = ({
  message,
}: NotificationListStateProps) => {
  return (
    <div className={s.state}>
      <Typography variant="text-14" className={s.stateText}>
        {message}
      </Typography>
    </div>
  );
};
