import { Stack } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { prefetchOrders } from "@/actions/orders.actions";
import { OrdersHeader } from "@/components/orders-header";
import { OrdersTable } from "@/components/orders-table";
import {
  DEFAULT_ROWS_PER_PAGE,
  FetchTags,
  ORDERS_DEFAULT_FILTER,
  START_PAGE,
} from "@/constants";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      FetchTags.ORDERS,
      START_PAGE,
      DEFAULT_ROWS_PER_PAGE,
      ORDERS_DEFAULT_FILTER,
    ],
    queryFn: async () =>
      await prefetchOrders(START_PAGE, DEFAULT_ROWS_PER_PAGE),
  });

  return (
    <Stack gap={3} sx={{ mt: 0 }}>
      <OrdersHeader />

      {/* TODO: susspence? */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <OrdersTable />
      </HydrationBoundary>
    </Stack>
  );
}
