import {
  Stack,
  TableCell,
  tableCellClasses,
  TableSortLabel,
  tableSortLabelClasses,
  useTheme,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";

import { ColumnFilter } from "@/components/column-filter";
import { OrdersTableHeaderConfig, SortOrder } from "@/types";
import { OrderFilter } from "@/types/orders";

interface Props {
  config: OrdersTableHeaderConfig;
  withActionColumn?: boolean;
}

const DEFAULT_ORDER: SortOrder = "asc";

const ACTION_COLUMN_CONFIG = {
  title: "",
  key: "" as keyof OrderFilter,
  withFilter: false,
  width: "1%",
  hideSortIcon: true,
};
const REMOVE_COLUMN_CONFIG = {
  title: "&nbsp;",
  key: "&nbsp;" as keyof OrderFilter,
  withFilter: false,
  width: "1%",
  hideSortIcon: true,
};

export const useOrdersTable = ({ config, withActionColumn = true }: Props) => {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_ORDER);

  const theme = useTheme();

  const handleOnClickSortLabel = useCallback(
    (filter: string) => {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setSortKey(filter);
    },
    [sortOrder],
  );

  const headers = useMemo(() => {
    const headers = withActionColumn
      ? config.concat([ACTION_COLUMN_CONFIG, REMOVE_COLUMN_CONFIG])
      : config;

    return headers.map(
      ({ title, hideSortIcon, key, withFilter = true, width = "auto" }) => (
        <TableCell
          key={title}
          color="red"
          size="small"
          width={width}
          align="center"
          sx={{
            textTransform: "capitalize",
            [`&.${tableCellClasses.head}`]: {
              backgroundColor: theme.palette.primary.dark,
            },
            color: theme.palette.common.white,
          }}
        >
          {title && (
            <Stack
              justifyContent="space-between"
              alignItems="center"
              direction="row"
            >
              <TableSortLabel
                active={sortKey === key}
                onClick={() => handleOnClickSortLabel(key)}
                direction={sortOrder}
                sx={{
                  display: hideSortIcon ? "none" : "flex",
                  [`&.${tableSortLabelClasses.active}`]: {
                    color: theme.palette.secondary.main,
                  },
                  [`&.${tableSortLabelClasses.root}:hover`]: {
                    color: theme.palette.secondary.main,
                  },
                  [`&.${tableSortLabelClasses.icon}`]: {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                {title}
              </TableSortLabel>

              {withFilter && (
                <ColumnFilter
                  id="orders-table-filter"
                  title={title}
                  dataKey={key as keyof OrderFilter}
                />
              )}
            </Stack>
          )}
        </TableCell>
      ),
    );
  }, [
    config,
    sortKey,
    sortOrder,
    theme,
    withActionColumn,
    handleOnClickSortLabel,
  ]);

  return {
    sortKey,
    headers,
    sortOrder,
  };
};
