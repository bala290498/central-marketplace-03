"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { NotificationModal } from "@/components/NotificationModal";

interface NotificationContextType {
  hasUnread: boolean;
  badgeCount: number;
  isModalOpen: boolean;
  openNotification: () => void;
  closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  hasUnread: false,
  badgeCount: 0,
  isModalOpen: false,
  openNotification: () => {},
  closeNotification: () => {},
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [hasUnread, setHasUnread] = useState<boolean>(false);
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // After 10 seconds of page load, trigger 1 red circle notification badge
    const timer = setTimeout(() => {
      setHasUnread(true);
      setBadgeCount(1);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const openNotification = () => {
    setIsModalOpen(true);
  };

  const closeNotification = () => {
    setIsModalOpen(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        hasUnread,
        badgeCount,
        isModalOpen,
        openNotification,
        closeNotification,
      }}
    >
      {children}
      <NotificationModal isOpen={isModalOpen} onClose={closeNotification} />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
