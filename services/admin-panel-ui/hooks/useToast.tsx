import { useCallback } from "react";
import { toast, ToastOptions } from "react-toastify/unstyled";

import { Alert } from "@/components/ui/alert";
import { ENotificationTypes, NOTIFICATIONS } from "@/constants";

export const useToast = () => {
  const sendNotification = useCallback(
    (type: ENotificationTypes, customOptions?: ToastOptions) => {
      const { message, severity, title, options } = NOTIFICATIONS[type];

      return toast(
        <Alert message={message} severity={severity} title={title} />,
        {
          toastId: message,
          style: { padding: 0, width: 400 },
          ...options,
          ...customOptions,
        },
      );
    },
    [],
  );

  return {
    sendNotification,
  };
};
