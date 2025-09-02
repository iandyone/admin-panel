import { useQuery } from '@tanstack/react-query';

import { $axios } from '@/configs';
import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import {  useToast } from '@/hooks';
import { EmployeeResponse } from '@/types';

export const useGetEmployeeQuery = () => {
  const { sendNotification } = useToast();

  return (
    useQuery({
      queryKey: [FetchTags.EMPLOYEE],
      queryFn: async () => {
        try {
          const response = await $axios.get<EmployeeResponse>(API_PATH.EMPLOYEE);

          return response.data;
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
