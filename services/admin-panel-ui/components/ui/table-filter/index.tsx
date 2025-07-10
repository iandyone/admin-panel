"use client";

import { Button, Menu } from "@mui/material";
import { FC, MouseEvent, useState } from "react";

import { SearchModal } from "@/components/ui/search-modal";
import { FilterIcon } from "@/svg/filter-icon";

interface Props {
  id: string;
  onClick?: () => void;
  onClose?: () => void;
  label: string;
  iconColors: {
    fill?: string;
    stroke?: string;
    primary?: string;
  };
}

export const TableFilter: FC<Props> = ({
  id,
  onClick,
  onClose,
  label,
  iconColors: { fill, primary, stroke },
}) => {
  const [modalAnchor, setModalAnchor] = useState<HTMLElement | null>(null);

  const handleOnCloseFilter = () => {
    setModalAnchor(null);

    if (onClose) {
      onClose();
    }
  };

  const handleOnClickFilterButton = ({
    currentTarget,
  }: MouseEvent<HTMLButtonElement>) => {
    setModalAnchor(currentTarget);

    if (onClick) {
      onClick();
    }
  };

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
        <SearchModal label={label} />
      </Menu>
    </>
  );
};
