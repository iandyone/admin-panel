"use client";

import { Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";

import { LABELS_WITH_NUMERIC_FIELDS } from "@/constants";
import { useSearch } from "@/hooks";

export interface TextModalProps {
  title: string;
  dataKey: string;
  setIsActive: (flag: boolean) => void;
  onClickControls: () => void;
}

export const TextSearchModal: FC<TextModalProps> = ({
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
  } = useSearch(dataKey);

  const handleOnClickApplyButton = () => {
    applySearchFilterHandler();
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
        value={Boolean(filterValue) ? filterValue : ""}
        onChange={handleOnChangeFilter}
        type={LABELS_WITH_NUMERIC_FIELDS.includes(dataKey) ? "number" : "text"}
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
