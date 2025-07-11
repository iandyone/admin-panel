"use client";

import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { FC, useMemo } from "react";

import { TableRowItem } from "@/components/table-row";
import { ROWS_PER_PAGE_OPTIONS } from "@/constants";
import { usePagination, useTable } from "@/hooks";
import { USERS_DATA } from "@/mocks/table";
import { HeaderData } from "@/types";
import { getSortedOrdersData } from "@/utils";

import styles from "./styles.module.css";

const HEADERS: HeaderData[] = [
  { title: "id", width: "5%" },
  { title: "name", width: "30%" },
  { title: "role", width: "10%" },
  { title: "phone", width: "10%" },
  { title: "last_activity", width: "10%" },
  { title: "orders", width: "10%" },
  { title: "status", width: "10%" },
  { title: "", width: "5%" },
];

const USERS_PER_PAGE_OPTIONS = [5, 10, 15];

// TODO: UsersTable и OrdersTable похожи. Подумать об одной конфигурируемой таблице
export const UsersTable: FC = () => {
  const { order, filter, headers } = useTable(HEADERS);
  const { page, rowsPerPage, handleOnChangePage, handleChangeRowsPerPage } =
    usePagination({
      count: USERS_DATA.length,
      rowsPerPageOptions: USERS_PER_PAGE_OPTIONS,
    });

  const data = useMemo(() => {
    const visibleRows = USERS_DATA.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ).map(({ isActive, ...rowData }) => {
      const result = {
        ...rowData,
        status: isActive ? "Active" : "Inactive",
      };

      return result;
    });

    return order
      ? getSortedOrdersData(visibleRows, filter, order)
      : visibleRows;
  }, [filter, order, page, rowsPerPage]);

  return (
    <Box>
      <TableContainer className={styles.table}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>{headers}</TableRow>
          </TableHead>
          <TableBody>
            {data.map((user, index) => (
              <TableRowItem
                key={user.id}
                data={user}
                selected={index % 2 !== 0}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        component="div"
        count={USERS_DATA.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleOnChangePage}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
