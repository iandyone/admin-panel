"use client";

import { Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  resetOrdersFilter,
  resetUsersFilter,
  selectOrdersFilter,
  selectUsersFilter,
  setOrdersFilter,
  setUsersFilter,
} from "@/store";
import { isOrdersFilterLabel, isUsersFilterLabel } from "@/utils";

interface Props {
  label: string;
  setIsActive: (flag: boolean) => void;
  onClickControls: () => void;
}

export const TextSearchModal: FC<Props> = ({
  label,
  setIsActive,
  onClickControls,
}) => {
  const dispatch = useAppDispatch();
  const isOrdersFilter = isOrdersFilterLabel(label);
  const isUsersFilter = isUsersFilterLabel(label);

  const ordersFilters = useAppSelector(selectOrdersFilter);
  const usersFilters = useAppSelector(selectUsersFilter);

  const [value, setValue] = useState(() => {
    if (isUsersFilter) {
      return usersFilters[label];
    }

    if (isOrdersFilter) {
      return ordersFilters[label];
    }

    return "";
  });

  const handleOnClickApplyButton = () => {
    if (isOrdersFilter) {
      // set
      dispatch(setOrdersFilter({ key: label, value: value }));
    }

    if (isUsersFilter) {
      dispatch(setUsersFilter({ key: label, value: value }));
    }

    setIsActive(Boolean(value));
    onClickControls();
  };

  const handleOnClickResetButton = () => {
    if (isOrdersFilter) {
      dispatch(resetOrdersFilter({ key: label }));
    }

    if (isUsersFilter) {
      dispatch(resetUsersFilter({ key: label }));
    }

    setIsActive(false);
    setValue("");
    onClickControls();
  };

  const handleOnChangeFilter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return (
    <Stack sx={{ p: 1, width: 250 }} spacing={2}>
      <TextField
        id="outlined-basic"
        size="small"
        label={`Search by ${label}`}
        variant="outlined"
        value={Boolean(value) ? value : ""}
        onChange={handleOnChangeFilter}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={handleOnClickApplyButton}
          sx={{ width: 80 }}
        >
          Apply
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={handleOnClickResetButton}
          size="small"
          sx={{ width: 80 }}
        >
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};
