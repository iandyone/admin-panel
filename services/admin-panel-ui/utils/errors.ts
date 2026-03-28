import { signOut } from 'next-auth/react';

import { ERoutes } from '@/constants';
import { wait } from '@/utils';

export const isUnauthorizedError = (error: unknown): boolean => {
  if (error instanceof Response) {
    return error.status === 401;
  }

  if (error instanceof Error && error.cause instanceof Response) {
    return error.cause.status === 401;
  }

  return false;
};

export const signOutAndRedirect = async (getNotification: () => void, delay = 3000) => {
  getNotification();

  await wait(delay)

  signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });
}
