/** Соответствует enum NotificationType на бэкенде / WS-событию `notification`. */
export enum NotificationType {
  SUBSCRIPTION_ACTIVATED = 'SUBSCRIPTION_ACTIVATED',
  SUBSCRIPTION_EXPIRING_7D = 'SUBSCRIPTION_EXPIRING_7D',
  SUBSCRIPTION_EXPIRING_1D = 'SUBSCRIPTION_EXPIRING_1D',
  NEXT_PAYMENT_1D = 'NEXT_PAYMENT_1D',
}

/** Payload события Socket.IO `notification`. */
export type NotificationWebSocketPayload = {
  type: NotificationType;
  message: string;
  createdAt: string;
};

/** Единая UI-модель уведомления (REST + WS). */
export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  createdAt: string;
  isRead: boolean;
};
