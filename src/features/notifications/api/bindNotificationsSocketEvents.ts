import type { Socket } from 'socket.io-client';
import { refreshAccessToken } from '@/shared/lib';
import type { NotificationWebSocketPayload } from '@/entities/notification/model/types';

type SocketHandlers = {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onNotification: (payload: NotificationWebSocketPayload) => void;
};

const reconnectWithFreshToken = async (socket: Socket): Promise<void> => {
  socket.disconnect();

  const newToken = await refreshAccessToken();

  if (!newToken) {
    return;
  }

  socket.auth = { token: newToken };
  socket.connect();
};

export const bindNotificationsSocketEvents = (
  socket: Socket,
  handlers: SocketHandlers,
): void => {
  if (handlers.onConnect) {
    socket.on('connect', handlers.onConnect);
  }

  if (handlers.onDisconnect) {
    socket.on('disconnect', handlers.onDisconnect);
  }

  socket.on('notification', (payload: NotificationWebSocketPayload) => {
    handlers.onNotification(payload);
  });

  socket.on('token.expired', () => {
    void reconnectWithFreshToken(socket);
  });

  socket.on('connect_error', (error: Error) => {
    if (!error.message.startsWith('Unauthorized')) {
      return;
    }

    void reconnectWithFreshToken(socket);
  });
};

export const disconnectNotificationsSocket = (socket: Socket | null): void => {
  socket?.disconnect();
  socket?.removeAllListeners();
};
