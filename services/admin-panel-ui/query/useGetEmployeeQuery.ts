import { useQuery } from '@tanstack/react-query';

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { EmployeeResponse } from '@/types';

export const useGetEmployeeQuery = () => {
  const { sendNotification } = useToast();

  return (
    useQuery({
      queryKey: [FetchTags.EMPLOYEE],
      queryFn: async () => {
        try {
          const response = await fetch(`/api${API_PATH.EMPLOYEE}`);

          const data: EmployeeResponse = await response.json();

          return data;
        } catch (error) {
          console.log({ error });
          sendNotification(ENotificationTypes.EMPLOYEE_FETCHING_ERROR);

          const nullResponse: EmployeeResponse = {
            deliveryman: [],
            managers: []
          }


          return nullResponse
        }
      },
    }))
}
