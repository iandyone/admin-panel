"use client";

import { Autocomplete, Stack, TextField } from "@mui/material";
import { FC, SyntheticEvent, useCallback } from "react";

import { FormControls } from "@/components/form-controls";
import { useFilter } from "@/hooks";
import { EUserStatuses } from "@/types";

export interface AutocompleteProps {
  dataKey: string;
  title: string;
  setIsActive: (isActive: boolean) => void;
  onClickControls: () => void;
  options: string[];
}

const { ACTIVE, INACTIVE } = EUserStatuses;

const userStatusMap: Record<string, string> = {
  true: ACTIVE,
  false: INACTIVE,
};

export const AutocompleteSearchModal: FC<AutocompleteProps> = ({
  title,
  dataKey,
  options,
  onClickControls,
  setIsActive,
}) => {
  const {
    filterValue,
    setFilterValue,
    applySearchFilterHandler,
    resetSearchFilterHandler,
  } = useFilter(dataKey);

  const handleOnClickApplyButton = useCallback(() => {
    const value = dataKey === "isActive" ? filterValue === ACTIVE : filterValue;

    applySearchFilterHandler(String(value).toLowerCase());
    setIsActive(Boolean(filterValue));
    onClickControls();
  }, [
    applySearchFilterHandler,
    dataKey,
    filterValue,
    onClickControls,
    setIsActive,
  ]);

  const handleOnClickResetButton = useCallback(() => {
    resetSearchFilterHandler();
    setIsActive(false);
    onClickControls();
  }, [resetSearchFilterHandler, onClickControls, setIsActive]);

  const handleOnChange = (event: SyntheticEvent, newValue: string | null) => {
    setFilterValue(String(newValue));
  };

  return (
    <>
      <Stack sx={{ p: 1, width: 250 }} spacing={2}>
        <Autocomplete
          options={options}
          value={userStatusMap[filterValue] || filterValue}
          onChange={handleOnChange}
          size="small"
          renderInput={(params) => (
            <TextField {...params} name={title} label={title} />
          )}
        />

        <FormControls
          onClickApply={handleOnClickApplyButton}
          onClickReset={handleOnClickResetButton}
        />
      </Stack>
    </>
  );
};
