/* eslint-disable import-plugin/order */

"use client";

import {
  Stack,
  TableCell,
  tableCellClasses,
  TableSortLabel,
  tableSortLabelClasses,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";

import { TableFilter } from "@/components/ui/table-filter";
import { SortOrder } from "@/types";

interface Props {
  title: string;
  width: string;
  isActive: boolean;
  direction: SortOrder;
  onClickFilter: (newFilter: string) => void;
  hideSortIcon?: boolean;
  filters?: boolean;
}

export const OrdersTableHead: FC<Props> = ({
  title,
  width,
  isActive,
  direction,
  onClickFilter,
  hideSortIcon,
  filters = true,
}) => {
  const theme = useTheme();

  // TODO: логика непустого фильтра
  const [flag, setFlag] = useState(false);

  const handleOnClickFilter = () => {
    onClickFilter(title);
  };

  const handleOnClickFilterButton = () => {
    setFlag((v) => !v);
  };

  return (
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
            active={isActive}
            onClick={handleOnClickFilter}
            direction={direction}
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

          {filters && (
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
  );
};
