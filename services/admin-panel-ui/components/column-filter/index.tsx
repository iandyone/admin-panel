"use client";

import { Button, Menu, useTheme } from "@mui/material";
import { FC, MouseEvent, useCallback, useMemo, useState } from "react";

import { FilterIcon } from "@/svg/filter-icon";
import { FilterGetter, FilterSetter } from "@/types";
import { OrderFilters, UsersFilter } from "@/types/orders";
import {
  getModalByLabelMap,
  getModalOptionsByLabel,
} from "@/utils";

interface Props {
  id: string;
  onClick?: () => void;
  dataKey: keyof OrderFilters | keyof UsersFilter;
  title: string;
  getFilterValue: FilterGetter;
  setFilterValue: FilterSetter;
  mode: "orders" | "users";
}

export const ColumnFilter: FC<Props> = ({
  id,
  dataKey,
  title,
  onClick,
  getFilterValue,
  setFilterValue,
  mode = "orders",
}) => {
  const [modalAnchor, setModalAnchor] = useState<HTMLElement | null>(null);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const theme = useTheme();


  // const optionsType = isOrdersFilterLabel(dataKey) ? "orders" : "users";

  const Modal = useMemo(() => getModalByLabelMap(dataKey), [dataKey]);
  const options = useMemo(
    () => getModalOptionsByLabel(dataKey, mode),
    [dataKey, mode],
  );

  const handleOnCloseFilter = () => {
    setModalAnchor(null);
  };

  const handleOnClickFilterButton = useCallback(
    ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      setModalAnchor(currentTarget);

      if (onClick) {
        onClick();
      }
    },
    [onClick],
  );

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
            isFilterActive
              ? theme.palette.secondary.main
              : theme.palette.common.black
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
        <Modal
          dataKey={dataKey}
          title={title}
          options={Object.values(options)}
          getFilterValue={getFilterValue}
          setFilterValue={setFilterValue}
          onClickControls={handleOnCloseFilter}
          setIsActive={setIsFilterActive}
        />
      </Menu>
    </>
  );
};
