'use client';

import { useCallback, useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';
import { getApiBaseUrl, tokenStorage } from '@/shared/lib';
import type { NotificationWebSocketPayload } from '@/entities/notification/model/types';
import {
  bindNotificationsSocketEvents,
  disconnectNotificationsSocket,
} from './bindNotificationsSocketEvents';

type UseNotificationsSocketOptions = {
  enabled?: boolean;
  onNotification: (notification: NotificationWebSocketPayload) => void;
};

export const useNotificationsSocket = ({
  enabled = true,
  onNotification,
}: UseNotificationsSocketOptions) => {
  const socketRef = useRef<Socket | null>(null);
  const onNotificationRef = useRef(onNotification);

  useEffect(() => {
    onNotificationRef.current = onNotification;
  }, [onNotification]);

  const connect = useCallback(() => {
    const token = tokenStorage.get();

    if (!token) {
      return;
    }

    disconnectNotificationsSocket(socketRef.current);

    const socket = io(`${getApiBaseUrl()}/notifications`, {
      auth: { token },
      autoConnect: true,
      reconnection: true,
    });

    bindNotificationsSocketEvents(socket, {
      onNotification: (payload) => onNotificationRef.current(payload),
    });

    socketRef.current = socket;
  }, []);

  useEffect(() => {
    if (!enabled) {
      disconnectNotificationsSocket(socketRef.current);
      socketRef.current = null;

      return;
    }

    connect();

    return () => {
      disconnectNotificationsSocket(socketRef.current);
      socketRef.current = null;
    };
  }, [connect, enabled]);
};
