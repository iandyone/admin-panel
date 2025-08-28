import { Stack } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unauthorized } from 'next/navigation';

import { prefetchEmployees, prefetchProducts } from "@/actions";
import { prefetchOrders } from "@/actions/orders.actions";
import { OrdersHeader } from "@/components/orders-header";
import { OrdersTable } from "@/components/orders-table";
import { auth } from '@/configs';
import {
  DEFAULT_ROWS_PER_PAGE,
  FetchTags,
  ORDERS_DEFAULT_FILTER,
  START_PAGE,
} from "@/constants";

const { ORDERS, EMPLOYEE, PRODUCTS } = FetchTags;

const queryClient = new QueryClient({ defaultOptions: {} });

export default async function Page() {
  const session = await auth();

  if (!session) {
    unauthorized();
  }

  await queryClient.prefetchQuery({
    queryKey: [
      ORDERS,
      START_PAGE,
      DEFAULT_ROWS_PER_PAGE,
      ORDERS_DEFAULT_FILTER,
    ],
    queryFn: async () =>
      await prefetchOrders(START_PAGE, DEFAULT_ROWS_PER_PAGE),
  });

  await queryClient.prefetchQuery({
    queryKey: [EMPLOYEE],
    queryFn: async () => prefetchEmployees(),
  });

  await queryClient.prefetchQuery({
    queryKey: [PRODUCTS],
    queryFn: async () => prefetchProducts(),
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
