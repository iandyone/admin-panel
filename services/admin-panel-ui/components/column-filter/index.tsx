"use client";

import { Button, Menu } from "@mui/material";
import { ChangeEvent, FC, MouseEvent, useCallback, useState } from "react";

import { SearchModal } from "@/components/ui/search-modal";
import { useAppDispatch } from "@/hooks";
import {
  resetOrdersFilter,
  resetUsersFilter,
  setOrdersFilter,
  setUsersFilter,
} from "@/store";
import { FilterIcon } from "@/svg/filter-icon";
import { OrderFilters, UsersFilter } from "@/types/orders";
import { isOrdersFilterLabel, isUsersFilterLabel } from "@/utils";

interface Props {
  id: string;
  onClick?: () => void;
  onClose?: () => void;
  label: keyof OrderFilters | keyof UsersFilter;
  iconColors: {
    fill?: string;
    stroke?: string;
    primary?: string;
  };
}

export const ColumnFilter: FC<Props> = ({
  id,
  onClick,
  onClose,
  label,
  iconColors: { fill, primary, stroke },
}) => {
  const dispatch = useAppDispatch();
  const [modalAnchor, setModalAnchor] = useState<HTMLElement | null>(null);
  const [filter, setFilter] = useState("");

  const isOrdersFilter = isOrdersFilterLabel(label);
  const isUsersFilter = isUsersFilterLabel(label);

  const handleOnCloseFilter = useCallback(() => {
    setModalAnchor(null);

    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleOnClickFilterButton = ({
    currentTarget,
  }: MouseEvent<HTMLButtonElement>) => {
    setModalAnchor(currentTarget);

    if (onClick) {
      onClick();
    }
  };

  const handleOnChangeFilter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFilter(target.value);
  };

  const handleOnClickApplyButton = useCallback(() => {
    if (isOrdersFilter) {
      dispatch(setOrdersFilter({ key: label, value: filter }));
    }

    if (isUsersFilter) {
      dispatch(setUsersFilter({ key: label, value: filter }));
    }

    handleOnCloseFilter();
  }, [
    filter,
    label,
    isOrdersFilter,
    isUsersFilter,
    dispatch,
    handleOnCloseFilter,
  ]);

  const handleOnClickResetButton = useCallback(() => {
    if (isOrdersFilter) {
      dispatch(resetOrdersFilter({ key: label }));
    }

    if (isUsersFilter) {
      dispatch(resetUsersFilter({ key: label }));
    }

    handleOnCloseFilter();
  }, [label, isOrdersFilter, isUsersFilter, dispatch, handleOnCloseFilter]);

  return (
    <>
      <Button
        sx={{ minWidth: "auto", p: 0 }}
        onClick={handleOnClickFilterButton}
      >
        <FilterIcon fill={fill} stroke={stroke} primary={primary} />
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
          onChange={handleOnChangeFilter}
          onApply={handleOnClickApplyButton}
          onReset={handleOnClickResetButton}
        />
      </Menu>
    </>
  );
};
