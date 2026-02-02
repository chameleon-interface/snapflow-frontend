import { clsx, Typography } from 'snapflow-ui-kit';
import s from './InputDescription.module.css';

type Props = {
  description: string;
  className?: string;
};

export const InputDescription = ({ description, className }: Props) => {
  return (
    <Typography className={clsx(s.description, className)} variant={'text-14'}>
      {description}
    </Typography>
  );
};
