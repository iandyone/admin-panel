"use client";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  Box,
} from "@mui/material";
import {
  ChangeEventHandler,
  FC,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

import { OrdersTableHead } from "@/components/orders-table-head";
import { OrdersTableRow } from "@/components/orders-table-row";
import { ORDERS_DATA } from "@/mocks";
import { SortOrder } from "@/types";
import { getSortedOrdersData } from "@/utils";

import styles from "./styles.module.css";

const DEFAULT_ROWS_PER_PAGE = 10;
const ROWS_PER_PAGE_OPTIONS = [
  DEFAULT_ROWS_PER_PAGE,
  DEFAULT_ROWS_PER_PAGE * 2.5,
  DEFAULT_ROWS_PER_PAGE * 5,
  DEFAULT_ROWS_PER_PAGE * 7.5,
];

const DEFAULT_ORDER: SortOrder = "asc";

const HEADERS = [
  { title: "id", width: "5%", filters: false },
  { title: "order", width: "30%" },
  { title: "price", width: "7%" },
  { title: "customer", width: "10%" },

  { title: "location", width: "15%" },

  { title: "date", width: "6%" },
  { title: "manager", width: "15%" },
  { title: "status", width: "15%" },
  { title: "", width: "5%", hideSortIcon: true },
];

export const OrdersTable: FC = () => {
  const [order, setOrder] = useState<SortOrder>(DEFAULT_ORDER);
  const [filter, setFilter] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [page, setPage] = useState(0);

  const data = useMemo(() => {
    const visibleRows = ORDERS_DATA.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    return filter
      ? getSortedOrdersData(visibleRows, filter, order)
      : visibleRows;
  }, [order, filter, page, rowsPerPage]);

  const handleOnChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => {
    setPage(page);
  };

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLTextAreaElement> = ({
    target: { value },
  }) => {
    setRowsPerPage(parseInt(value, 10));
  };

  const handleOnClickFilterButton = useCallback(
    (newFilter: string) => {
      const sortOrder: SortOrder = order === "asc" ? "desc" : "asc";

      setFilter(newFilter);
      setOrder(filter === newFilter ? sortOrder : DEFAULT_ORDER);
    },
    [filter, order],
  );

  return (
    <Box>
      <TableContainer className={styles.table}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {HEADERS.map((header) => (
                <OrdersTableHead
                  key={header.title}
                  isActive={filter === header.title}
                  direction={order}
                  onClickFilter={handleOnClickFilterButton}
                  {...header}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((orderData, index) => (
              <OrdersTableRow
                hover
                key={orderData.id}
                orderData={orderData}
                selected={index % 2 !== 0}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        component="div"
        count={ORDERS_DATA.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleOnChangePage}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
