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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectUsersFilter, setUsersFilter } from "@/store";
import {
  FilterGetter,
  FilterSetter,
  SortOrder,
  UsersTableHeaderConfig,
} from "@/types";
import { UsersFilter } from "@/types/orders";

interface Props {
  config: UsersTableHeaderConfig;
  withActionColumn?: boolean;
}

const DEFAULT_ORDER: SortOrder = "asc";

const ACTION_COLUMN_CONFIG = {
  title: "",
  key: "" as keyof UsersFilter,
  withFilter: false,
  width: "5%",
  hideSortIcon: true,
};

export const useUsersTable = ({ config, withActionColumn = true }: Props) => {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_ORDER);

  const filters = useAppSelector(selectUsersFilter);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const handleOnClickSortLabel = useCallback(
    (filter: string) => {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setSortKey(filter);
    },
    [sortOrder],
  );

  const getFilterValue: FilterGetter = useCallback(
    (key) => filters[key as keyof UsersFilter],
    [filters],
  );
  const setFilterValue: FilterSetter = useCallback(
    (key, value) =>
      dispatch(setUsersFilter({ key: key as keyof UsersFilter, value })),
    [dispatch],
  );

  const headers = useMemo(() => {
    const headers = withActionColumn
      ? config.concat([ACTION_COLUMN_CONFIG])
      : config;

    return headers.map(
      ({ title, key, hideSortIcon, width = "auto", withFilter = true }) => (
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
                <ColumnFilter
                  id="users-table-filter"
                  title={title}
                  mode="users"
                  dataKey={key as keyof UsersFilter}
                  getFilterValue={getFilterValue}
                  setFilterValue={setFilterValue}
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
    getFilterValue,
    setFilterValue,
    withActionColumn,
    handleOnClickSortLabel,
  ]);

  return {
    sortKey,
    headers,
    sortOrder,
  };
};
