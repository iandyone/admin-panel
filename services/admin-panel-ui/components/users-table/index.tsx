"use client";

import { FC, useMemo } from "react";

import { DataGrid } from "@/components/data-grid";
import { ROWS_PER_PAGE_OPTIONS, usersTableHeaderConfig } from "@/constants";
import { useAppSelector, usePagination, useTable } from "@/hooks";
import { selectUsers } from "@/store";
import { DataGridConfig } from "@/types";
import { getSortedOrdersData } from "@/utils";

import styles from "./styles.module.css";

const USERS_PER_PAGE_OPTIONS = [5, 10, 15];

export const UsersTable: FC = () => {
  const users = useAppSelector(selectUsers);

  const { order, filter, headers } = useTable({
    config: usersTableHeaderConfig,
  });
  const { page, rowsPerPage, handleOnChangePage, handleChangeRowsPerPage } =
    usePagination({
      count: users.length,
      rowsPerPageOptions: USERS_PER_PAGE_OPTIONS,
    });

  const data = useMemo(() => {
    const visibleRows = users
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(({ isActive, ...rowData }) => {
        const result = {
          ...rowData,
          status: isActive ? "Active" : "Inactive",
        };

        return result;
      });

    return order
      ? getSortedOrdersData(visibleRows, filter, order)
      : visibleRows;
  }, [users, filter, order, page, rowsPerPage]);

  const config: DataGridConfig = useMemo(
    () => ({
      headers,
      data,
      pagination: {
        page,
        rowsPerPage,
        count: users.length,
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
