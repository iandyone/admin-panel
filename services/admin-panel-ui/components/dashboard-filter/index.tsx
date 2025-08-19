"use client";

import { Button, Stack } from "@mui/material";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { FC, useState } from "react";

import { useAppSearchParams } from "@/hooks";

import { PeriodFilter } from "../period-filter";

export const DashboardFilter: FC = () => {
  const { searchParams, setSearchParam, updateUrlWithSearchParams } =
    useAppSearchParams();

  const [dateFrom, setDateFrom] = useState<number | null>(
    Number(searchParams.get("dateFrom")) || null,
  );

  const [dateTo, setDateTo] = useState<number | null>(
    Number(searchParams.get("dateTo")) || null,
  );

  const handleOnChangeDateFrom = (value: PickerValue) => {
    const newValue = value ? value?.valueOf() : null;

    setDateFrom(newValue);
    setSearchParam("dateFrom", newValue ? newValue.toString() : "");
  };

  const handleOnChangeDateTo = (value: PickerValue) => {
    const newValue = value ? value?.valueOf() : null;

    setDateTo(newValue);
    setSearchParam("dateTo", newValue ? newValue.toString() : "");
  };

  const handleOnClickApply = () => {
    updateUrlWithSearchParams();
  };

  return (
    <Stack direction='row' spacing={3}>
      <PeriodFilter
        containerProps={{
          spacing: { md: 2, xs: 2 },
          columns: { md: 2, xs: 2 },
          sx: {
            width: "49%",
          },
        }}
        valueTo={dateTo || ""}
        valueFrom={dateFrom || ""}
        onChangeDateFrom={handleOnChangeDateFrom}
        onChangeDateTo={handleOnChangeDateTo}
      />
      <Button
        // disabled={disabled}
        type="submit"
        variant="contained"
        color="info"
        size="small"
        onClick={handleOnClickApply}
        sx={{ width: 80 }}
      >
        Apply
      </Button>
    </Stack>
  );
};
