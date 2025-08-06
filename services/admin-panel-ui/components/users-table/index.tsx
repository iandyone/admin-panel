"use client";

import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";

import { DataGrid } from "@/components/data-grid";
import { usersTableHeaderConfig } from "@/configs";
import { ROWS_PER_PAGE_OPTIONS, USERS_SEARCH_FILTERS } from "@/constants";
import { usePagination, useUsersTable } from "@/hooks";
import { useGetUsersQuery } from '@/query';
import { DataGridConfig, User } from "@/types";
import { UsersFilter } from "@/types/orders";
import { getFormattedDate, getSortedOrdersData } from "@/utils";

import styles from "./styles.module.css";

export const UsersTable: FC = () => {
  const searchParams = useSearchParams();

  const filters: UsersFilter = USERS_SEARCH_FILTERS.reduce(
    (acc, filterKey) => ({
      ...acc,
      [filterKey]: searchParams.get(filterKey),
    }),
    {} as UsersFilter,
  );

  const { page, rowsPerPage, handleOnChangePage, handleChangeRowsPerPage } =
    usePagination();
    
  const { data: usersFetchData, isSuccess: isUsersFetched } = useGetUsersQuery(
    page,
    rowsPerPage,
    filters,
  );

  const { sortOrder, sortKey, headers } = useUsersTable({
    config: usersTableHeaderConfig,
  });

  const data = useMemo(() => {
    if (isUsersFetched) {
      const visibleRows = usersFetchData.users.map(
        ({ isActive, lastActivity, orders, phone, role, ...rowData }) => {
          const result: User = {
            ...rowData,
            phone,
            role: role.toLowerCase(),
            lastActivity: lastActivity ? getFormattedDate(lastActivity) : "—",
            orders: orders ?? "—",
            isActive,
          };

          return result;
        },
      );

      return sortOrder
        ? getSortedOrdersData(visibleRows, sortKey, sortOrder)
        : visibleRows;
    }

    return [];
  }, [isUsersFetched, usersFetchData, sortKey, sortOrder]);

  const config: DataGridConfig = useMemo(
    () => ({
      headers,
      data,
      pagination: {
        page,
        rowsPerPage,
        count: usersFetchData?.total || 0,
        onPageChange: handleOnChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
        rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
      },
    }),
    [
      data,
      usersFetchData,
      headers,
      page,
      rowsPerPage,
      handleChangeRowsPerPage,
      handleOnChangePage,
    ],
  );

  return <DataGrid config={config} tableClassName={styles.table} />;
};
