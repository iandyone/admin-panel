import { Button, Stack } from "@mui/material";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { FC, useState } from "react";

import { PeriodFilter } from "@/components/period-filter";
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

export const DateSearchModal: FC<AutocompleteProps> = ({
  getFilterValue,
  setFilterValue,
  onClickControls,
  setIsActive,
}) => {
  const [valueFrom, setValueFrom] = useState(() => getFilterValue("dateFrom"));
  const [valueTo, setValueTo] = useState(() => getFilterValue("dateTo"));

  const handleOnClickApplyButton = () => {
    setFilterValue("dateFrom", valueFrom);
    setFilterValue("dateTo", valueTo);
    setIsActive(Boolean(valueFrom) || Boolean(valueTo));
    onClickControls();
  };

  const handleOnClickResetButton = () => {
    setFilterValue("dateFrom", "");
    setFilterValue("dateTo", "");
    setIsActive(false);
    setValueFrom("");
    onClickControls();
  };

  const handleOnChangeDateFrom = (value: PickerValue) => {
    setValueFrom(value?.valueOf() || "");
  };
  const handleOnChangeDateTo = (value: PickerValue) => {
    setValueTo(value?.valueOf() || "");
  };

  return (
    <>
      <Stack sx={{ p: 1, width: 250 }} spacing={2}>
        <PeriodFilter
          containerProps={{
            spacing: 2,
            columns: 1,
          }}
          valueTo={valueTo}
          valueFrom={valueFrom}
          onChangeDateFrom={handleOnChangeDateFrom}
          onChangeDateTo={handleOnChangeDateTo}
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
