import { JSX } from 'react';

import { OrderData } from '@/types/orders';
import { UserData } from '@/types/user';

export interface HeaderData {
  title: string;
  width?: string | number;
  hideSortIcon?: boolean;
  withFilter?: boolean;
}

export interface DataGridConfig {
  headers: JSX.Element[];
  data: UserData[] | OrderData[];
  pagination?: {
    page: number;
    count: number;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement> | null,
      page: number,
    ) => void;
    onRowsPerPageChange: React.ChangeEventHandler<
      HTMLTextAreaElement | HTMLInputElement
    >;
  };
}
