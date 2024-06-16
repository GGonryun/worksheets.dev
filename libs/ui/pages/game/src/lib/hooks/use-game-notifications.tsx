import { AlertColor } from '@mui/material';
import { createContext, useContext, useState } from 'react';

export type GameNotification = {
  id: string;
  text: string;
  color: AlertColor;
};
type GameNotificationContextType = {
  notifications: GameNotification[];
  showing: boolean;
  active: boolean;
  add: (
    text: string,
    opts?: Partial<{ color: AlertColor; unique: boolean }>
  ) => void;
  remove: (id: string) => void;
  show: (b: boolean) => void;
};

export const GameNotificationContext =
  createContext<GameNotificationContextType>({
    notifications: [],
    showing: false,
    active: false,
    add: () => {
      return;
    },
    remove: () => {
      return;
    },
    show: () => {
      return;
    },
  });

export const useGameNotifications = () => {
  const context = useContext(GameNotificationContext);
  if (context === null) {
    throw new Error(
      'useGameNotifications must be used within a GameNotificationContextProvider'
    );
  }
  return context;
};

export const GameNotificationContextProvider: React.FC<{
  children: React.ReactNode;
  limit: number;
}> = ({ children, limit }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<GameNotification[]>([]);
  const [active, setActive] = useState(false);

  const addNotification: GameNotificationContextType['add'] = (
    text,
    opts = { color: 'success', unique: false }
  ) => {
    if (opts.unique && notifications.find((n) => n.text === text)) return;

    if (notifications.length >= limit) {
      setNotifications((prev) => prev.slice(1));
    }

    const id = Math.random().toString(36).substring(7);
    setNotifications((prev) => [
      ...prev,
      { id, text, color: opts.color ?? 'success' },
    ]);
    setActive(true);
  };

  const removeNotification = (id: string) => {
    const newNotifications = [...notifications].filter((n) => n.id !== id);
    if (newNotifications.length === 0) {
      setShowNotifications(false);
      setActive(false);
    }
    setNotifications(newNotifications);
  };

  const setShow = (show: boolean) => {
    setShowNotifications(show);
    if (!show) {
      setActive(false);
    }
  };

  return (
    <GameNotificationContext.Provider
      value={{
        notifications,
        add: addNotification,
        remove: removeNotification,
        showing: showNotifications,
        show: setShow,
        active: active,
      }}
    >
      {children}
    </GameNotificationContext.Provider>
  );
};
