"use client";

import moment from "moment";
import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";

import { DataGrid } from "@/components/data-grid";
import { usersTableHeaderConfig } from "@/configs";
import { ROWS_PER_PAGE_OPTIONS, USERS_SEARCH_FILTERS } from "@/constants";
import { usePagination, useUsersTable } from "@/hooks";
import { useGetUsersQuery } from "@/query/useGetUsersQuery";
import { DataGridConfig, EUserStatuses, User } from "@/types";
import { UsersFilter } from "@/types/orders";
import {
  getFilteredUsersData,
  getFormattedDate,
  getSortedOrdersData,
} from "@/utils";
import { formatPhoneNumber } from "@/utils/date";

import styles from "./styles.module.css";

const { ACTIVE, INACTIVE } = EUserStatuses;

export const UsersTable: FC = () => {
  const searchParams = useSearchParams();

  const { page, rowsPerPage, handleOnChangePage, handleChangeRowsPerPage } =
    usePagination();

  const { data: usersFetchData, isSuccess: isUsersFetched } = useGetUsersQuery(
    page,
    rowsPerPage,
  );

  const { sortOrder, sortKey, headers } = useUsersTable({
    config: usersTableHeaderConfig,
  });

  const filters: UsersFilter = USERS_SEARCH_FILTERS.reduce(
    (acc, filterKey) => ({
      ...acc,
      [filterKey]: searchParams.get(filterKey),
    }),
    {} as UsersFilter,
  );

  const usersData = useMemo(
    () =>
      isUsersFetched ? getFilteredUsersData(usersFetchData.users, filters) : [],
    [usersFetchData, filters, isUsersFetched],
  );

  const data = useMemo(() => {
    const visibleRows = usersData.map(
      ({ isActive, lastActivity, orders, phone, role, ...rowData }) => {
        const result: User = {
          ...rowData,
          phone: formatPhoneNumber(phone),
          role: role.toLowerCase(),
          lastActivity: moment.isDate(lastActivity)
            ? getFormattedDate(lastActivity)
            : "—",
          orders: orders ?? "—",
          status: isActive ? ACTIVE : INACTIVE,
        };

        return result;
      },
    );

    return sortOrder
      ? getSortedOrdersData(visibleRows, sortKey, sortOrder)
      : visibleRows;
  }, [usersData, sortKey, sortOrder]);

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
