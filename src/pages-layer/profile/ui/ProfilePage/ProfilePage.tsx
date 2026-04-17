import { ProfileContent } from './ProfileContent/ProfileContent';

type Props = {
  id: string;
};

export function ProfilePage({ id }: Props) {
  return <ProfileContent id={id} />;
}
