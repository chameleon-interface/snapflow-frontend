import { Card, Typography } from 'snapflow-ui-kit';
import s from './FormWrapper.module.css';
import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export const FormWrapper = ({ title, children, className }: Props) => {
  return (
    <Card className={clsx(s.wrapper, className)}>
      <Typography variant={'h1'} as={'h1'}>
        {title}
      </Typography>
      {children}
    </Card>
  );
};
