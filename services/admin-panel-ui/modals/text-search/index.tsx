"use client";

import { Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

import { LABELS_WITH_NUMERIC_FIELDS } from "@/constants";
import { FilterGetter, FilterSetter } from "@/types";

export interface TextModalProps {
  title: string;
  dataKey: string;
  setIsActive: (flag: boolean) => void;
  onClickControls: () => void;
  getFilterValue: FilterGetter;
  setFilterValue: FilterSetter;
}

export const TextSearchModal: FC<TextModalProps> = ({
  dataKey,
  title,
  getFilterValue,
  setFilterValue,
  setIsActive,
  onClickControls,
}) => {
  const [value, setValue] = useState(() => getFilterValue(dataKey));

  const handleOnClickApplyButton = () => {
    setFilterValue(dataKey, value);
    setIsActive(Boolean(value));
    onClickControls();
  };

  const handleOnClickResetButton = () => {
    setValue("");
    setFilterValue(dataKey, "");
    setIsActive(false);
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
        label={`Search by ${title}`}
        variant="outlined"
        value={Boolean(value) ? value : ""}
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
