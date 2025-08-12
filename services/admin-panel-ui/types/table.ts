import { Dispatch, FC, JSX, SetStateAction } from "react";

import { Order, OrderFilter, UsersFilter } from "@/types/orders";
import { User } from "@/types/user";

export type DataGridType = "orders" | "users";

export interface HeaderData {
  title: string;
  width?: string | number;
  hideSortIcon?: boolean;
  withFilter?: boolean;
}

export type OrdersTableHeaderConfig = Array<
  HeaderData & {
    key: keyof OrderFilter | "";
  }
>;

export type UsersTableHeaderConfig = Array<
  HeaderData & {
    key: keyof UsersFilter | '';
  }
>;

export interface DataGridConfig {
  headers: JSX.Element[];
  data: User[] | Order[];
  width?: string | number;
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


export const getActionColumnConfig = <T>() => ({
  title: '',
  key: "" as keyof T,
  withFilter: false,
  width: "1%",
  hideSortIcon: true,
})

export const getRemoveColumnConfig = <T>() => ({
  title: "&nbsp;",
  key: "&nbsp;" as keyof T,
  withFilter: false,
  width: "1%",
  hideSortIcon: true,
})
