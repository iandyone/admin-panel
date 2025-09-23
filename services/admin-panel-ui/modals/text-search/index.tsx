"use client";

import { Stack, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";

import { FormControls } from "@/components/form-controls";
import { LABELS_WITH_NUMERIC_FIELDS } from "@/constants";
import { useFilter } from "@/hooks";

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
  } = useFilter(dataKey);

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

      <FormControls
        onClickApply={handleOnClickApplyButton}
        onClickReset={handleOnClickResetButton}
      />
    </Stack>
  );
};
