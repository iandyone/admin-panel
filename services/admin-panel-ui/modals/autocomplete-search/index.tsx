import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";

import { FilterGetter, FilterSetter } from "@/types";

export interface AutocompleteProps {
  dataKey: string;
  title: string;
  setIsActive: (flag: boolean) => void;
  onClickControls: () => void;
  getFilterValue: FilterGetter;
  setFilterValue: FilterSetter;
  options: string[];
}

export const AutocompleteSearchModal: FC<AutocompleteProps> = ({
  title,
  dataKey,
  options,
  getFilterValue,
  setFilterValue,
  onClickControls,
  setIsActive,
}) => {
  const [value, setValue] = useState(() => getFilterValue(dataKey));

  const handleOnClickApplyButton = () => {
    setFilterValue(dataKey, value);
    setIsActive(Boolean(value));
    onClickControls();
  };

  const handleOnClickResetButton = () => {
    setFilterValue(dataKey, "");
    setIsActive(false);
    setValue("");
    onClickControls();
  };

  const handleOnChange = (event: SyntheticEvent, newValue: string | null) => {
    setValue(String(newValue));
  };

  return (
    <>
      <Stack sx={{ p: 1, width: 250 }} spacing={2}>
        <Autocomplete
          options={options}
          value={value}
          onChange={handleOnChange}
          size='small'
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
