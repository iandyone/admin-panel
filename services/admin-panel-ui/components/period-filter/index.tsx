"use client";

import { Grid, GridProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { PickerValue } from "@mui/x-date-pickers/internals";
import moment from "moment";
import { FC } from "react";

interface Props {
  containerProps: GridProps;
  valueFrom?: number | string;
  valueTo?: number | string;
  onChangeDateFrom?: (value: PickerValue) => void;
  onChangeDateTo?: (value: PickerValue) => void;
}

export const PeriodFilter: FC<Props> = ({
  valueFrom,
  valueTo,
  containerProps,
  onChangeDateFrom,
  onChangeDateTo,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid container {...containerProps}>
        <Grid size={1}>
          <DatePicker
            sx={{ width: "100%" }}
            openTo="day"
            value={valueFrom ? moment(valueFrom) : null}
            format="DD.MM.YYYY"
            slotProps={{
              textField: { size: "small" },
              field: { clearable: true },
            }}
            label="Date from"
            onChange={onChangeDateFrom}
          />
        </Grid>
        <Grid size={1}>
          <DatePicker
            sx={{ width: "100%" }}
            openTo="day"
            format="DD.MM.YYYY"
            value={valueTo ? moment(valueTo) : null}
            slotProps={{
              textField: { size: "small" },
              field: { clearable: true },
            }}
            label="Date to"
            onChange={onChangeDateTo}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
