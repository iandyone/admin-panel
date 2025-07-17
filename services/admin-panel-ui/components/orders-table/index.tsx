"use client";

import { FC, useMemo } from "react";

import { DataGrid } from "@/components/data-grid";
import { ordersTableHeaderConfig, ROWS_PER_PAGE_OPTIONS } from "@/constants";
import { useAppSelector, usePagination, useTable } from "@/hooks";
import { selectOrders } from "@/store";
import { DataGridConfig } from "@/types";
import { getSortedOrdersData } from "@/utils";

import styles from "./styles.module.css";

export const OrdersTable: FC = () => {
  const orders = useAppSelector(selectOrders);

  const { order, filter, headers } = useTable({
    config: ordersTableHeaderConfig,
  });
  
  const { page, rowsPerPage, handleOnChangePage, handleChangeRowsPerPage } =
    usePagination({ count: orders.length });

  const data = useMemo(() => {
    const visibleRows = orders.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    return order
      ? getSortedOrdersData(visibleRows, filter, order)
      : visibleRows;
  }, [orders,filter, order, page, rowsPerPage]);

  const config: DataGridConfig = useMemo(
    () => ({
      headers,
      data,
      pagination: {
        page,
        rowsPerPage,
        count: orders.length,
        onPageChange: handleOnChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
        rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
      },
    }),
    [
      data,
      orders,
      headers,
      page,
      rowsPerPage,
      handleChangeRowsPerPage,
      handleOnChangePage,
    ],
  );

  return <DataGrid config={config} tableClassName={styles.table} />;
};
