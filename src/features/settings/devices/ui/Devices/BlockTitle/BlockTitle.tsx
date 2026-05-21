import { Typography } from 'snapflow-ui-kit';
import styles from './BlockTitle.module.css';

type Props = {
  title: string;
  id?: string;
};

export const BlockTitle = ({ title, id }: Props) => {
  return (
    <Typography id={id} variant="h3" as="h3" className={styles.blockTitle}>
      {title}
    </Typography>
  );
};
