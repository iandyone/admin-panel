import { useQuery } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

import { API_PATH, ENotificationTypes, ERoutes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { EmployeeResponse } from '@/types';
import { isUnauthorizedError } from '@/utils';

const { EMPLOYEE_FETCHING_ERROR, SESSION_EXPIRED } = ENotificationTypes;

export const useGetEmployeeQuery = () => {
  const { sendNotification } = useToast();

  return (
    useQuery({
      queryKey: [FetchTags.EMPLOYEE],
      queryFn: async () => {
        try {
          const response = await fetch(`/api${API_PATH.EMPLOYEE}`);

          if (!response.ok) {
            throw new Error('Request failed', { cause: response });
          }

          const data: EmployeeResponse = await response.json();

          return data;
        } catch (error) {
          if (isUnauthorizedError(error)) {
            sendNotification(SESSION_EXPIRED);

            return await signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });
          }

          console.log({ error });

          sendNotification(EMPLOYEE_FETCHING_ERROR);

          const nullResponse: EmployeeResponse = {
            deliveryman: [],
            managers: []
          }

          return nullResponse
        }
      },
    }))
}
