import { Modal } from 'snapflow-ui-kit/client';
import { Button, Typography } from 'snapflow-ui-kit';
import s from './EmailSentModal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  email: string;
};

export const EmailSentModal = ({ open, onClose, email }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={'Email sent'}
      className={s.modal}
    >
      <Typography variant={'text-16'}>
        We have sent a link to confirm your email to {email}
      </Typography>
      <Button className={s.button} onClick={onClose}>
        ОК
      </Button>
    </Modal>
  );
};
