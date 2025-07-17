"use client";

import { FC, useMemo } from "react";

import { DataGrid } from "@/components/data-grid";
import { usersTableHeaderConfig } from '@/config';
import { ROWS_PER_PAGE_OPTIONS } from "@/constants";
import { useAppSelector, usePagination, useTable } from "@/hooks";
import { selectUsers, selectUsersFilter } from "@/store";
import { DataGridConfig } from "@/types";
import { getFilteredUsersData, getSortedOrdersData } from "@/utils";

import styles from "./styles.module.css";

const USERS_PER_PAGE_OPTIONS = [5, 10, 15];

export const UsersTable: FC = () => {
  // TODO: получение отфильтрованного списка на стороне сервера
  const users = useAppSelector(selectUsers);
  const filters = useAppSelector(selectUsersFilter);

  const usersData = useMemo(
    () => getFilteredUsersData(users, filters),
    [users, filters],
  );

  const { sortOrder, sortKey, headers } = useTable({
    config: usersTableHeaderConfig,
  });

  const { page, rowsPerPage, handleOnChangePage, handleChangeRowsPerPage } =
    usePagination({
      count: usersData.length,
      rowsPerPageOptions: USERS_PER_PAGE_OPTIONS,
    });

  const data = useMemo(() => {
    const visibleRows = usersData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(({ isActive, ...rowData }) => {
        const result = {
          ...rowData,
          status: isActive ? "Active" : "Inactive",
        };

        return result;
      });

    return sortOrder
      ? getSortedOrdersData(visibleRows, sortKey, sortOrder)
      : visibleRows;
  }, [usersData, sortKey, sortOrder, page, rowsPerPage]);

  const config: DataGridConfig = useMemo(
    () => ({
      headers,
      data,
      pagination: {
        page,
        rowsPerPage,
        count: usersData.length,
        onPageChange: handleOnChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
        rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
      },
    }),
    [
      data,
      users,
      headers,
      page,
      rowsPerPage,
      handleChangeRowsPerPage,
      handleOnChangePage,
    ],
  );

  return <DataGrid config={config} tableClassName={styles.table} />;
};
