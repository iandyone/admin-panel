import { Dispatch, FC, JSX, SetStateAction } from "react";

import { OrderData, OrderFilters, UsersFilter } from "@/types/orders";
import { UserData } from "@/types/user";

export type DataGridType = "orders" | "users";

export interface HeaderData {
  title: string;
  width?: string | number;
  hideSortIcon?: boolean;
  withFilter?: boolean;
}

export type OrdersTableHeaderConfig = Array<
  HeaderData & {
    key: keyof OrderFilters | "";
  }
>;

export type UsersTableHeaderConfig = Array<
  HeaderData & {
    key: keyof UsersFilter | "";
  }
>;

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
  modal?: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    Component: FC;
  };
}

export type FilterGetter = (key: string) => string | number;

export type FilterSetter = (key: string, value: string| number) => void;
