import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { FC } from "react";

export const PeriodFilter: FC = () => {
  return (
    <Grid container spacing={{ md: 3, xs: 2 }} columns={{ md: 4, xs: 2 }}>
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
  );
};
