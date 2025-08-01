"use client";

import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";

import { DataGrid } from "@/components/data-grid";
import { ordersTableHeaderConfig } from "@/config";
import { ORDERS_SEARCH_FILTERS, ROWS_PER_PAGE_OPTIONS } from "@/constants";
import { useAppSelector, useOrdersTable, usePagination } from "@/hooks";
import { selectOrders } from "@/store";
import { DataGridConfig, OrderData } from "@/types";
import { OrderFilters } from "@/types/orders";
import {
  getFilteredOrdersData,
  getFormattedDate,
  getSortedOrdersData,
} from "@/utils";

import styles from "./styles.module.css";

export const OrdersTable: FC = () => {
  // TODO: получение отфильтрованного списка на стороне сервера
  const params = useSearchParams();
  const orders = useAppSelector(selectOrders);

  const filters: OrderFilters = ORDERS_SEARCH_FILTERS.reduce(
    (acc, filterKey) => ({
      ...acc,
      [filterKey]: params.get(filterKey),
    }),
    {} as OrderFilters,
  );

  const ordersData = useMemo(
    () => getFilteredOrdersData(orders, filters),
    [orders, filters],
  );

  const { sortOrder, sortKey, headers } = useOrdersTable({
    config: ordersTableHeaderConfig,
  });

  const { page, rowsPerPage, handleOnChangePage, handleChangeRowsPerPage } =
    usePagination({ count: ordersData.length });

  const data = useMemo(() => {
    const visibleRows = ordersData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(({ date, manager, status, ...rowData }) => {
        const result: OrderData = {
          ...rowData,
          date: getFormattedDate(date),
          manager,
          status,
        };

        return result;
      });

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
