"use client";

import { Grid, GridProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { FC } from "react";

interface Props {
  containerProps: GridProps;
}

export const PeriodFilter: FC<Props> = ({ containerProps }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid container {...containerProps}>
        <Grid size={1}>
          <DatePicker
            sx={{ width: "100%" }}
            openTo="day"
            slotProps={{
              textField: { size: "small" },
              field: { clearable: true },
            }}
            label="Date from"
          />
        </Grid>
        <Grid size={1}>
          <DatePicker
            sx={{ width: "100%" }}
            openTo="day"
            slotProps={{
              textField: { size: "small" },
              field: { clearable: true },
            }}
            label="Date to"
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
