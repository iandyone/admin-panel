import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { FC } from "react";

import { TableRowItem } from "@/components/data-grid/table-row";
import { DataGridConfig } from "@/types";

interface Props {
  config: DataGridConfig;
  tableClassName?: string;
}
export const DataGrid: FC<Props> = ({
  config: { data, headers, pagination, width },
  tableClassName,
}) => {
  return (
    <Box>
      <TableContainer className={tableClassName}>
        <Table stickyHeader aria-label="sticky table" sx={{ width }}>
          <TableHead>
            <TableRow>{headers}</TableRow>
          </TableHead>
          <TableBody>
            {data.map((rowData, index) => (
              <TableRowItem
                key={rowData.id}
                data={rowData}
                selected={index % 2 !== 0}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <TablePagination
          component="div"
          page={pagination.page}
          count={pagination.count}
          rowsPerPage={pagination.rowsPerPage}
          onPageChange={pagination.onPageChange}
          rowsPerPageOptions={pagination.rowsPerPageOptions}
          onRowsPerPageChange={pagination.onRowsPerPageChange}
        />
      )}
    </Box>
  );
};
