"use client";

import { Button, Menu, useTheme } from "@mui/material";
import { FC, MouseEvent, useCallback, useState } from "react";

import { TextSearchModal } from "@/modals/text-search-modal";
import { FilterIcon } from "@/svg/filter-icon";
import { OrderFilters, UsersFilter } from "@/types/orders";

interface Props {
  id: string;
  onClick?: () => void;
  label: keyof OrderFilters | keyof UsersFilter;
}

export const ColumnFilter: FC<Props> = ({ id, onClick, label }) => {
  const [modalAnchor, setModalAnchor] = useState<HTMLElement | null>(null);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const theme = useTheme();

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
        <TextSearchModal
          label={label}
          onClickControls={handleOnCloseFilter}
          setIsActive={setIsFilterActive}
        />
      </Menu>
    </>
  );
};
