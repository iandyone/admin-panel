import { Button, Stack, Typography } from "@mui/material";

import { OrdersTable } from "@/components/orders-table";
import { PeriodFilter } from "@/components/period-filter";

export default function Page() {
  return (
    <Stack gap={3} sx={{ mt: 0 }}>
      <Typography component="h2" variant="h6">
        Orders
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PeriodFilter
          containerProps={{
            spacing: { md: 2, xs: 2 },
            columns: { md: 2, xs: 2 },
          }}
        />
        <Button variant="contained" color="warning">
          Add order
        </Button>
      </Stack>

      <OrdersTable />
    </Stack>
  );
}
