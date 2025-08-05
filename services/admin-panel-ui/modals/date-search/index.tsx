import { Button, Stack } from "@mui/material";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { FC, useState } from "react";

import { PeriodFilter } from "@/components/period-filter";
import { useAppSeatchParams } from "@/hooks";

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
  const { setSearchParam, updateUrlWithSearchParams, searchParams } =
    useAppSeatchParams();

  const [valueTo, setValueTo] = useState<number | null>(
    Number(searchParams.get("dateTo")) || null,
  );
  const [valueFrom, setValueFrom] = useState<number | null>(
    Number(searchParams.get("dateFrom")) || null,
  );

  const handleOnChangeDateFrom = (value: PickerValue) => {
    setValueFrom(value ? value?.valueOf() : null);
  };

  const handleOnChangeDateTo = (value: PickerValue) => {
    setValueTo(value ? value?.valueOf() : null);
  };

  const handleOnClickApplyButton = () => {
    setSearchParam("dateTo", valueTo ? valueTo.toString() : "");
    setSearchParam("dateFrom", valueFrom ? valueFrom.toString() : "");

    updateUrlWithSearchParams();
    setIsActive(Boolean(valueFrom) || Boolean(valueTo));
    onClickControls();
  };

  const handleOnClickResetButton = () => {
    setValueFrom(null);
    setValueTo(null);
    setSearchParam("dateTo", "");
    setSearchParam("dateFrom", "");

    updateUrlWithSearchParams();
    setIsActive(false);
    onClickControls();
  };

  return (
    <>
      <Stack sx={{ p: 1, width: 250 }} spacing={2}>
        <PeriodFilter
          containerProps={{
            spacing: 2,
            columns: 1,
          }}
          valueTo={valueTo || ""}
          valueFrom={valueFrom || ""}
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
