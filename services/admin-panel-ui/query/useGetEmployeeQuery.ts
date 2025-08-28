import { useQuery } from '@tanstack/react-query';

import { $axios } from '@/configs';
import { API_PATH, FetchTags } from '@/constants';
import { EmployeeResponse } from '@/types';

export const useGetEmployeeQuery = () => (
  useQuery({
    queryKey: [FetchTags.EMPLOYEE],
    queryFn: async () => {
      try {
        const response = await $axios.get<EmployeeResponse>(API_PATH.EMPLOYEE);

        return response.data;
      } catch (error) {
        console.log({ error });

        const nullResponse: EmployeeResponse = {
          deliveryman: [],
          managers: []
        }

        return nullResponse
      }
    },

  })
)
