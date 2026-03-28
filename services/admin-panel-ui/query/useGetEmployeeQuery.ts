/* eslint-disable no-console */
import { useQuery } from '@tanstack/react-query';

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { EmployeeResponse } from '@/types';
import { isUnauthorizedError, signOutAndRedirect } from '@/utils';

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
          console.log({ error });

          if (isUnauthorizedError(error)) {
            return await signOutAndRedirect(() => sendNotification(SESSION_EXPIRED));
          }

          sendNotification(EMPLOYEE_FETCHING_ERROR);

          return {
            deliveryman: [],
            managers: []
          } as EmployeeResponse
        }
      },
    }))
}
