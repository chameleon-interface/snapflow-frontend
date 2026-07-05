import { NotificationType, type NotificationWebSocketPayload } from './types';

const NOTIFICATION_TYPES = new Set<string>(Object.values(NotificationType));

export const isNotificationType = (
  value: unknown,
): value is NotificationType => {
  return typeof value === 'string' && NOTIFICATION_TYPES.has(value);
};

export const isNotificationWebSocketPayload = (
  value: unknown,
): value is NotificationWebSocketPayload => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    isNotificationType(payload.type) &&
    typeof payload.message === 'string' &&
    typeof payload.createdAt === 'string'
  );
};
