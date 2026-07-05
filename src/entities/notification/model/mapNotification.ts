import type { NotificationViewDto } from '@/shared/api/generated/model/core';
import type { NotificationsPageViewDtoNextCursor } from '@/shared/api/generated/model/core/notificationsPageViewDtoNextCursor';
import { isNotificationType } from './guards';
import {
  NotificationType,
  type Notification,
  type NotificationWebSocketPayload,
} from './types';

export const buildNotificationIdFromWs = (
  type: NotificationType,
  createdAt: string,
): string => `${type}:${createdAt}`;

const normalizeNotificationType = (value: unknown): NotificationType => {
  if (isNotificationType(value)) {
    return value;
  }

  return NotificationType.SUBSCRIPTION_ACTIVATED;
};

/** REST DTO → UI-модель. `notificationType` нормализуется в `type`. */
export const mapNotificationFromDto = (
  dto: NotificationViewDto,
): Notification => ({
  id: dto.id,
  type: normalizeNotificationType(dto.notificationType),
  message: dto.message,
  createdAt: dto.createdAt,
  isRead: dto.isRead,
});

/** WS payload → UI-модель. `id` синтетический до появления server id в push. */
export const mapNotificationFromWs = (
  payload: NotificationWebSocketPayload,
  options?: { isRead?: boolean },
): Notification => ({
  id: buildNotificationIdFromWs(payload.type, payload.createdAt),
  type: payload.type,
  message: payload.message,
  createdAt: payload.createdAt,
  isRead: options?.isRead ?? false,
});

/** Бэкенд отдаёт count как string (`"3"`). */
export const parseUnreadCount = (count: string): number => {
  const parsed = Number(count);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
};

/**
 * Opaque cursor из REST → query-параметр `cursor`.
 * OpenAPI типизирует nextCursor как object, на практике может быть string.
 */
export const serializeCursor = (
  cursor: NotificationsPageViewDtoNextCursor | string | undefined,
): string | undefined => {
  if (cursor == null) {
    return undefined;
  }

  if (typeof cursor === 'string') {
    return cursor;
  }

  return JSON.stringify(cursor);
};
