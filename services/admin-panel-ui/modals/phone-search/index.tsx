"use client";

import { Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";

import { useFilter } from "@/hooks";

export interface TextModalProps {
  title: string;
  dataKey: string;
  setIsActive: (flag: boolean) => void;
  onClickControls: () => void;
}

export const PhoneSearchModal: FC<TextModalProps> = ({
  dataKey,
  title,
  setIsActive,
  onClickControls,
}) => {
  const {
    filterValue,
    setFilterValue,
    applySearchFilterHandler,
    resetSearchFilterHandler,
  } = useFilter(dataKey);

  const handleOnClickApplyButton = () => {
    const phoneValue = encodeURIComponent(filterValue);

    applySearchFilterHandler(phoneValue);
    setIsActive(Boolean(filterValue));
    onClickControls();
  };

  const handleOnClickResetButton = () => {
    resetSearchFilterHandler();
    setIsActive(false);
    onClickControls();
  };

  const handleOnChangeFilter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(target.value);
  };

  return (
    <Stack sx={{ p: 1, width: 250 }} spacing={2}>
      <TextField
        id="outlined-basic"
        size="small"
        label={`Search by ${title}`}
        variant="outlined"
        value={Boolean(filterValue) ? decodeURIComponent(filterValue) : ""}
        onChange={handleOnChangeFilter}
        type='text'
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
