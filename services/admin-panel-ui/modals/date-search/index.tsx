import { Button, Stack } from "@mui/material";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { FC } from "react";

import { PeriodFilter } from "@/components/period-filter";
import { useSearch } from "@/hooks";

export interface AutocompleteProps {
  dataKey: string;
  title: string;
  setIsActive: (flag: boolean) => void;
  onClickControls: () => void;
  options: string[];
}

export const DateSearchModal: FC<AutocompleteProps> = ({
  onClickControls,
  setIsActive,
}) => {
  const {
    filterValue: valueFrom,
    setFilterValue: setValueFrom,
    applySearchFilterHandler: applyDateFromFilter,
  } = useSearch("dateFrom");
  const {
    filterValue: valueTo,
    setFilterValue: setValueTo,
    applySearchFilterHandler: applyDateToilter,
  } = useSearch("dateTo");

  const handleOnClickApplyButton = () => {
    applyDateFromFilter();
    applyDateToilter();
    setIsActive(Boolean(valueFrom) || Boolean(valueTo));
    onClickControls();
  };

  const handleOnClickResetButton = () => {
    applyDateFromFilter();
    applyDateToilter();
    setIsActive(false);
    setValueFrom("");
    onClickControls();
  };

  const handleOnChangeDateFrom = (value: PickerValue) => {
    setValueFrom(value?.valueOf().toString() || "");
  };
  const handleOnChangeDateTo = (value: PickerValue) => {
    setValueTo(value?.valueOf().toString() || "");
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
