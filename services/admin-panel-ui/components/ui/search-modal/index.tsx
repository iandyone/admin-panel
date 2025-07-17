"use client";

import {
  Button,
  Stack,
  TextField,
  StandardTextFieldProps,
} from "@mui/material";
import { FC } from "react";

import { useAppDispatch } from "@/hooks";
import {
  resetOrdersFilter,
  resetUsersFilter,
  setOrdersFilter,
  setUsersFilter,
} from "@/store";
import { isOrdersFilterLabel, isUsersFilterLabel } from "@/utils";

interface Props {
  label: string;
  value: string | number;
  setValue: StandardTextFieldProps["onChange"];
  onReset: () => void;
  onApply: () => void;
}

export const SearchModal: FC<Props> = ({
  value,
  setValue,
  label,
  onReset,
  onApply,
}) => {
  const dispatch = useAppDispatch();
  const isOrdersFilter = isOrdersFilterLabel(label);
  const isUsersFilter = isUsersFilterLabel(label);

  const handleOnClickApplyButton = () => {
    if (isOrdersFilter) {
      dispatch(setOrdersFilter({ key: label, value: value }));
    }

    if (isUsersFilter) {
      dispatch(setUsersFilter({ key: label, value: value }));
    }

    onApply();
  };

  const handleOnClickResetButton = () => {
    if (isOrdersFilter) {
      dispatch(resetOrdersFilter({ key: label }));
    }

    if (isUsersFilter) {
      dispatch(resetUsersFilter({ key: label }));
    }

    onReset();
  };

  return (
    <Stack sx={{ p: 1, width: 250 }} spacing={2}>
      <TextField
        id="outlined-basic"
        size="small"
        label={`Search by ${label}`}
        variant="outlined"
        value={Boolean(value) ? value : ""}
        onChange={setValue}
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
