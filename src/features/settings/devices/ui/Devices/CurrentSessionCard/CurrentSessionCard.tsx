'use client';

import { SessionsViewDto } from '@/shared/api/generated/model/sessionsViewDto';
import { Card } from 'snapflow-ui-kit';
import { DeviceHeader } from '../DeviceHeader';
import { DeviceInfo } from '../DeviceInfo';

type Props = {
  session?: SessionsViewDto;
};

export const CurrentSessionCard = ({ session }: Props) => {
  const deviceId = session?.deviceId;

  if (!deviceId) {
    return null;
  }

  return (
    <Card>
      <DeviceHeader deviceName={session?.deviceName} deviceId={deviceId} />
      <DeviceInfo session={session} isCurrentDevice />
    </Card>
  );
};
