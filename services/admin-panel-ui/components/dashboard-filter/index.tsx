"use client";

import { Button, Grid, Stack } from "@mui/material";
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
    <Grid
      container
      direction="row"
      columns={{ xs: 2, md: 2 }}
      spacing={3}
      rowSpacing={2}
    >
      <Grid size={{ md: 1, xs: 2 }}>
        <PeriodFilter
          containerProps={{
            spacing: { md: 2, xs: 2 },
            columns: { sm: 2, xs: 1 },
            sx: {
              width: "100%",
            },
          }}
          valueTo={dateTo || ""}
          valueFrom={dateFrom || ""}
          onChangeDateFrom={handleOnChangeDateFrom}
          onChangeDateTo={handleOnChangeDateTo}
        />
      </Grid>
      <Grid size={{ md: 1, xs: 2 }}>
        <Stack alignItems={{ md: "flex-start", sm: 'flex-end', xs: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="info"
            size="small"
            onClick={handleOnClickApply}
            sx={{ minWidth: 80, height: 40 }}
          >
            Apply
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
