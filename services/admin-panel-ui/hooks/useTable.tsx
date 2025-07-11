import {
  Stack,
  TableCell,
  tableCellClasses,
  TableSortLabel,
  tableSortLabelClasses,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";

import { TableFilter } from "@/components/ui/table-filter";
import { HeaderData, SortOrder } from "@/types";

const DEFAULT_ORDER: SortOrder = "asc";

export const useTable = (config: HeaderData[]) => {
  // TODO: логика непустого фильтра
  const [flag, setFlag] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [order, setOrder] = useState<SortOrder>(DEFAULT_ORDER);

  const theme = useTheme();

  const handleOnClickFilterButton = () => {
    setFlag((v) => !v);
  };

  const headers = useMemo(() => {
    const handleOnClickFilter = (filter: string) => {
      setOrder(order === "asc" ? "desc" : "asc");
      setFilter(filter);
    };

    return config.map(
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
                onClick={() => handleOnClickFilter(title)}
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
                <TableFilter
                  id="order-table-search-menu"
                  label={title}
                  onClick={handleOnClickFilterButton}
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
  }, [config, filter, order, flag, theme]);

  return {
    filter,
    headers,
    order,
  };
};
