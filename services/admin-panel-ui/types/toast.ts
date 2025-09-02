import { AlertProps } from '@mui/material';
import { ToastOptions } from 'react-toastify/unstyled';

export interface ToastPayload {
  title: string;
  message: string;
  severity: AlertProps["severity"];
  options?: ToastOptions;
}
