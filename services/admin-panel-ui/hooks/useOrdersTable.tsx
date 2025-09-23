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
import { EPermissions } from "@/constants";
import { OrdersTableHeaderConfig, SortOrder } from "@/types";
import { OrderFilter } from "@/types/orders";
import { getActionColumnConfig, getRemoveColumnConfig } from "@/types/table";

import { usePermissions } from "./usePermissions";

interface Props {
  config: OrdersTableHeaderConfig;
}

const DEFAULT_ORDER: SortOrder = "asc";
const EDIT_COLUMN_CONFIG = getActionColumnConfig<OrderFilter>();
const REMOVE_COLUMN_CONFIG = getRemoveColumnConfig<OrderFilter>();

export const useOrdersTable = ({ config }: Props) => {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_ORDER);
  const { checkPermission } = usePermissions();
  const theme = useTheme();

  const handleOnClickSortLabel = useCallback(
    (filter: string) => {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setSortKey(filter);
    },
    [sortOrder],
  );

  const actionColumns = useMemo(
    () =>
      checkPermission(EPermissions.REMOVE_ORDER)
        ? [EDIT_COLUMN_CONFIG, REMOVE_COLUMN_CONFIG]
        : [EDIT_COLUMN_CONFIG],
    [checkPermission],
  );

  const headers = useMemo(() => {
    const headers = config.concat(actionColumns);

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
    handleOnClickSortLabel,
    actionColumns,
  ]);

  return {
    sortKey,
    headers,
    sortOrder,
  };
};
