"use client";

import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { FC, SyntheticEvent } from "react";

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

  const handleOnClickApplyButton = () => {
    const value = dataKey === "isActive" ? filterValue === ACTIVE : filterValue;

    applySearchFilterHandler(String(value));
    setIsActive(Boolean(filterValue));
    onClickControls();
  };

  const handleOnClickResetButton = () => {
    resetSearchFilterHandler();
    setIsActive(false);
    onClickControls();
  };

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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
    </>
  );
};
