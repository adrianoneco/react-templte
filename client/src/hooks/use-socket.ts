import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '@shared/schema';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // In dev, Vite proxies /socket.io to backend
    // In prod, it connects to same origin
    const socket = io('/', {
      path: '/socket.io',
      transports: ['websocket'],
      secure: window.location.protocol === 'https:',
    });

    socketRef.current = socket;

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log('Socket connected');
      setIsConnected(true);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket: socketRef.current, isConnected };
}
