"use client";

import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";

import { DataGrid } from "@/components/data-grid";
import { ordersTableHeaderConfig } from "@/configs";
import { ORDERS_SEARCH_FILTERS, ROWS_PER_PAGE_OPTIONS } from "@/constants";
import { useOrdersTable, usePagination } from "@/hooks";
import { useGetOrdersQuery } from "@/query";
import { DataGridConfig, Order, OrderFilter } from "@/types";
import { getFormattedDate, getSortedOrdersData } from "@/utils";

import styles from "./styles.module.css";

export const OrdersTable: FC = () => {
  const params = useSearchParams();

  const filters: OrderFilter = ORDERS_SEARCH_FILTERS.reduce(
    (acc, filterKey) => ({
      ...acc,
      [filterKey]: params.get(filterKey),
    }),
    {} as OrderFilter,
  );

  const { sortOrder, sortKey, headers } = useOrdersTable({
    config: ordersTableHeaderConfig,
  });

  const { page, rowsPerPage, handleOnChangePage, handleChangeRowsPerPage } =
    usePagination();

  const { data: ordersData, isSuccess: isOrdersFetched } = useGetOrdersQuery(
    page,
    rowsPerPage,
    filters,
  );

  const data = useMemo(() => {
    if (isOrdersFetched) {
      const visibleRows = ordersData?.orders.map((order) => {
        const result: Order = {
          id: order.id,
          order: order.order.join(", "),
          totalAmount: order.totalAmount,
          location: order.location,
          customer: order.customer,
          createdAt: getFormattedDate(order.createdAt.toString()),
          updatedAt: getFormattedDate(order.updatedAt.toString()),
          manager: order.manager,
          deliveryman: order.deliveryman,
          status: order.status.toLowerCase(),
        };

        return result;
      });

      return sortOrder
        ? getSortedOrdersData(visibleRows, sortKey, sortOrder)
        : visibleRows;
    }

    return [];
  }, [ordersData, sortKey, sortOrder, isOrdersFetched]);

  const config: DataGridConfig = useMemo(
    () => ({
      width: 2000,
      headers,
      data,
      pagination: {
        page,
        rowsPerPage,
        count: ordersData?.total || 0,
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
