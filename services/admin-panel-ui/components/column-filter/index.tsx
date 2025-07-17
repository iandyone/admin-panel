"use client";

import { Button, Menu, useTheme } from "@mui/material";
import { ChangeEvent, FC, MouseEvent, useCallback, useState } from "react";

import { SearchModal } from "@/components/ui/search-modal";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  resetOrdersFilter,
  resetUsersFilter,
  selectOrdersFilter,
  selectUsersFilter,
} from "@/store";
import { FilterIcon } from "@/svg/filter-icon";
import { OrderFilters, UsersFilter } from "@/types/orders";
import { isOrdersFilterLabel, isUsersFilterLabel } from "@/utils";

interface Props {
  id: string;
  onClick?: () => void;
  label: keyof OrderFilters | keyof UsersFilter;
}

export const ColumnFilter: FC<Props> = ({ id, onClick, label }) => {
  const dispatch = useAppDispatch();
  const [modalAnchor, setModalAnchor] = useState<HTMLElement | null>(null);

  const ordersFilters = useAppSelector(selectOrdersFilter);
  const usersFilters = useAppSelector(selectUsersFilter);

  const isOrdersFilter = isOrdersFilterLabel(label);
  const isUsersFilter = isUsersFilterLabel(label);

  const [value, setValue] = useState(() => {
    if (isUsersFilter) {
      return usersFilters[label];
    }

    if (isOrdersFilter) {
      return ordersFilters[label];
    }

    return "";
  });

  const theme = useTheme();

  const handleOnChangeFilter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  const handleOnCloseFilter = useCallback(() => {
    setModalAnchor(null);

    if (isUsersFilter) {
      setValue(usersFilters[label]);
    }

    if (isOrdersFilter) {
      setValue(ordersFilters[label]);
    }
  }, [isOrdersFilter, isUsersFilter, label, ordersFilters, usersFilters]);

  const handleOnClickFilterButton = useCallback(
    ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      setModalAnchor(currentTarget);

      if (onClick) {
        onClick();
      }
    },
    [onClick],
  );

  const onApply = useCallback(() => {
    setModalAnchor(null);
  }, []);

  const onReset = useCallback(() => {
    if (isUsersFilter) {
      dispatch(resetUsersFilter({ key: label }));
    }

    if (isOrdersFilter) {
      dispatch(resetOrdersFilter({ key: label }));
    }

    setValue("");
    setModalAnchor(null);
  }, [label, dispatch, isOrdersFilter, isUsersFilter]);

  return (
    <>
      <Button
        sx={{ minWidth: "auto", p: 0 }}
        onClick={handleOnClickFilterButton}
      >
        <FilterIcon
          fill={theme.palette.common.white}
          stroke={theme.palette.common.white}
          primary={
            value ? theme.palette.secondary.main : theme.palette.common.black
          }
        />
      </Button>
      <Menu
        id={id}
        anchorEl={modalAnchor}
        open={Boolean(modalAnchor)}
        onClose={handleOnCloseFilter}
        anchorOrigin={{ horizontal: 0, vertical: 30 }}
      >
        <SearchModal
          label={label}
          value={value}
          setValue={handleOnChangeFilter}
          onReset={onReset}
          onApply={onApply}
        />
      </Menu>
    </>
  );
};
