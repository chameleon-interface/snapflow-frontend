import { Card, clsx } from 'snapflow-ui-kit';
import s from './FormContainer.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const FormContainer = ({ children, className }: Props) => {
  return <Card className={clsx(s.formContainer, className)}>{children}</Card>;
};
