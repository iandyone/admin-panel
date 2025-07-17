"use client";

import { FC, useMemo } from "react";

import { DataGrid } from "@/components/data-grid";
import { ordersTableHeaderConfig } from "@/config";
import { ROWS_PER_PAGE_OPTIONS } from "@/constants";
import { useAppSelector, usePagination, useTable } from "@/hooks";
import { selectOrders, selectOrdersFilter } from "@/store";
import { DataGridConfig } from "@/types";
import { getFilteredOrdersData, getSortedOrdersData } from "@/utils";

import styles from "./styles.module.css";

export const OrdersTable: FC = () => {
  // TODO: получение отфильтрованного списка на стороне сервера
  const orders = useAppSelector(selectOrders);
  const filters = useAppSelector(selectOrdersFilter);

  const ordersData = useMemo(
    () => getFilteredOrdersData(orders, filters),
    [orders, filters],
  );

  console.log({ ordersData, orders });

  const { sortOrder, sortKey, headers } = useTable({
    config: ordersTableHeaderConfig,
  });

  const { page, rowsPerPage, handleOnChangePage, handleChangeRowsPerPage } =
    usePagination({ count: ordersData.length });

  const data = useMemo(() => {
    const visibleRows = ordersData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    return sortOrder
      ? getSortedOrdersData(visibleRows, sortKey, sortOrder)
      : visibleRows;
  }, [ordersData, sortKey, sortOrder, page, rowsPerPage]);

  const config: DataGridConfig = useMemo(
    () => ({
      headers,
      data,
      pagination: {
        page,
        rowsPerPage,
        count: ordersData.length,
        onPageChange: handleOnChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
        rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
      },
    }),
    [
      data,
      headers,
      ordersData,
      page,
      rowsPerPage,
      handleChangeRowsPerPage,
      handleOnChangePage,
    ],
  );

  return <DataGrid config={config} tableClassName={styles.table} />;
};
