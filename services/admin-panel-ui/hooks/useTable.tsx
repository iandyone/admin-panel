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
import {
  OrdersTableHeaderConfig,
  SortOrder,
  UsersTableHeaderConfig,
} from "@/types";
import { UsersFilter } from "@/types/orders";

interface Props {
  config: OrdersTableHeaderConfig | UsersTableHeaderConfig;
  withActionColumn?: boolean;
}

const DEFAULT_ORDER: SortOrder = "asc";

const ACTION_COLUMN_CONFIG = {
  title: "" as keyof UsersFilter,
  withFilter: false,
  width: "5%",
  hideSortIcon: true,
};

export const useTable = ({ config, withActionColumn = true }: Props) => {
  // TODO: логика непустого фильтра
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
      ? config.concat([ACTION_COLUMN_CONFIG])
      : config;

    return headers.map(
      ({ title, width = "auto", hideSortIcon, withFilter = true }) => (
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
                active={sortKey === title}
                onClick={() => handleOnClickSortLabel(title)}
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
                <ColumnFilter id="order-table-search-menu" label={title} />
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
