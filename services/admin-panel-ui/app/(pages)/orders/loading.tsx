import { Stack } from "@mui/material";

import { TableLoader } from "@/components/loaders/table-loader";
import { OrdersHeader } from "@/components/orders-header";

export default function Loading() {
  return (
    <Stack gap={3} sx={{ mt: 0 }}>
      <OrdersHeader />
      <TableLoader />
    </Stack>
  );
}
