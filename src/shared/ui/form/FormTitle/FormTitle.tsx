import { clsx, Typography } from 'snapflow-ui-kit';
import s from './FormTitle.module.css';

type Props = {
  title: string;
  className?: string;
};

export const FormTitle = ({ title, className }: Props) => {
  return (
    <Typography variant="h1" className={clsx(s.formTitle, className)}>
      {title}
    </Typography>
  );
};
