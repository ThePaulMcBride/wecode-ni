"use client";

import {
  useMemo,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Router from "next/router";
import { Toaster, toast } from "react-hot-toast";

const NotificationContext = createContext();

function NotificationController({ children }) {
  const [pendingNotification, setPendingNotification] = useState();

  useEffect(() => {
    function clearNotifications() {
      toast.dismiss();
      if (pendingNotification) {
        if (pendingNotification.flashType === "error") {
          toast.error(pendingNotification.message);
          setPendingNotification(undefined);
          return;
        }
        if (pendingNotification.flashType === "success") {
          toast.success(pendingNotification.message);
          setPendingNotification(undefined);
          return;
        }
        toast(pendingNotification.message);
        setPendingNotification(undefined);
      }
    }
    Router.events.on("routeChangeComplete", clearNotifications);
    Router.events.on("routeChangeError", clearNotifications);

    return () => {
      Router.events.off("routeChangeComplete", clearNotifications);
      Router.events.off("routeChangeError", clearNotifications);
    };
  }, [setPendingNotification, pendingNotification]);

  const sendNotificationSignal = useCallback(
    function sendNotificationSignal({ type, message, flashType }) {
      if (type === "OPEN") {
        if (flashType === "error") {
          toast.error(message);
          setPendingNotification(undefined);
          return;
        }
        if (flashType === "success") {
          toast.success(message);
          setPendingNotification(undefined);
          return;
        }
        toast(message);
      }

      if (type === "REDIRECT") {
        setPendingNotification({
          message,
          flashType,
        });
      }
    },
    [setPendingNotification]
  );

  const redirectWithNotification = useCallback(
    function redirectWithNotification({ route, message, type = "success" }) {
      sendNotificationSignal({
        type: "REDIRECT",
        message,
        flashType: type,
      });
      Router.push(route);
    },
    [sendNotificationSignal]
  );

  const memoizedData = useMemo(() => {
    return {
      notificationData: {},
      sendNotificationSignal,
      redirectWithNotification,
    };
  }, [sendNotificationSignal, redirectWithNotification]);

  return (
    <NotificationContext.Provider value={memoizedData}>
      {children}
    </NotificationContext.Provider>
  );
}

function NotificationProvider({ children }) {
  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ duration: 7000 }} />
      <NotificationController>{children}</NotificationController>
    </>
  );
}

function useNotification() {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationContext"
    );
  }

  return context;
}

export { NotificationProvider, useNotification };
