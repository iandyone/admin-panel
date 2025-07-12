"use client";

import { FC, useMemo } from "react";

import { DataGrid } from "@/components/data-grid";
import { ordersTableHeaderConfig, ROWS_PER_PAGE_OPTIONS } from "@/constants";
import { usePagination, useTable } from "@/hooks";
import { ORDERS_DATA } from "@/mocks";
import { DataGridConfig } from "@/types";
import { getSortedOrdersData } from "@/utils";

import styles from "./styles.module.css";

export const OrdersTable: FC = () => {
  const { order, filter, headers } = useTable({
    config: ordersTableHeaderConfig,
  });
  const { page, rowsPerPage, handleOnChangePage, handleChangeRowsPerPage } =
    usePagination({ count: ORDERS_DATA.length });

  const data = useMemo(() => {
    const visibleRows = ORDERS_DATA.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    return order
      ? getSortedOrdersData(visibleRows, filter, order)
      : visibleRows;
  }, [filter, order, page, rowsPerPage]);

  const config: DataGridConfig = useMemo(
    () => ({
      headers,
      data,
      pagination: {
        page,
        rowsPerPage,
        count: ORDERS_DATA.length,
        onPageChange: handleOnChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
        rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
      },
    }),
    [
      data,
      headers,
      page,
      rowsPerPage,
      handleChangeRowsPerPage,
      handleOnChangePage,
    ],
  );

  return <DataGrid config={config} tableClassName={styles.table} />;
};
