import { Button, Stack } from "@mui/material";

import { OrdersTable } from "@/components/orders-table";
import { PeriodFilter } from "@/components/period-filter";

export default function Page() {
  return (
    <Stack gap={3} sx={{ mt: 0 }}>
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
