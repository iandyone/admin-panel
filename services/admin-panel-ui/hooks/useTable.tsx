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
import { HeaderData, SortOrder } from "@/types";

interface Props {
  config: HeaderData[];
  withActionColumn?: boolean;
}

const DEFAULT_ORDER: SortOrder = "asc";

const ACTION_COLUMN_CONFIG = {
  title: "",
  withFilter: false,
  width: "5%",
  hideSortIcon: true,
};

export const useTable = ({ config, withActionColumn = true }: Props) => {
  // TODO: логика непустого фильтра
  const [flag, setFlag] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [order, setOrder] = useState<SortOrder>(DEFAULT_ORDER);

  const theme = useTheme();

  const handleOnClickColumnFilter = (filter: string) => {
    setFlag((v) => !v);
    setFilter(filter);
  };

  const handleOnClickSortLabel = useCallback(() => {
    setOrder(order === "asc" ? "desc" : "asc");
  }, [order]);

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
                active={filter === title}
                onClick={handleOnClickSortLabel}
                direction={order}
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
                  id="order-table-search-menu"
                  label={title}
                  onClick={() => handleOnClickColumnFilter(title)}
                  iconColors={{
                    fill: theme.palette.common.white,
                    stroke: theme.palette.common.white,
                    primary: flag
                      ? theme.palette.secondary.main
                      : theme.palette.common.black,
                  }}
                />
              )}
            </Stack>
          )}
        </TableCell>
      ),
    );
  }, [
    config,
    filter,
    order,
    flag,
    theme,
    withActionColumn,
    handleOnClickSortLabel,
  ]);

  return {
    filter,
    headers,
    order,
  };
};
