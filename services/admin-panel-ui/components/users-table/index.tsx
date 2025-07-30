"use client";

import moment from "moment";
import { FC, useMemo } from "react";

import { DataGrid } from "@/components/data-grid";
import { usersTableHeaderConfig } from "@/config";
import { ROWS_PER_PAGE_OPTIONS } from "@/constants";
import { useAppSelector, usePagination, useUsersTable } from "@/hooks";
import { selectUsersFilter } from "@/store";
import { DataGridConfig, EUserStatuses, UserData } from "@/types";
import {
  getFilteredUsersData,
  getFormattedDate,
  getSortedOrdersData,
} from "@/utils";
import { formatPhoneNumber } from "@/utils/date";

import styles from "./styles.module.css";

interface Props {
  users: UserData[];
}

const USERS_PER_PAGE_OPTIONS = [5, 10, 15];
const { ACTIVE, INACTIVE } = EUserStatuses;

export const UsersTable: FC<Props> = ({ users }) => {
  const filters = useAppSelector(selectUsersFilter);

  const usersData = useMemo(
    () => getFilteredUsersData(users, filters),
    [users, filters],
  );

  const { sortOrder, sortKey, headers } = useUsersTable({
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
      .map(({ isActive, lastActivity, orders, phone, role, ...rowData }) => {
        const result: UserData = {
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
      usersData,
      headers,
      page,
      rowsPerPage,
      handleChangeRowsPerPage,
      handleOnChangePage,
    ],
  );

  return <DataGrid config={config} tableClassName={styles.table} />;
};
