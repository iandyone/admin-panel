import { Stack } from "@mui/material";

import { OrdersHeader } from "@/components/ordera-header";
import { OrdersTable } from "@/components/orders-table";

export default function Page() {
  return (
    <Stack gap={3} sx={{ mt: 0 }}>
      <OrdersHeader />

      <OrdersTable />
    </Stack>
  );
}
