import { Grid, Stack, Typography } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import {
  getDashboardStats,
  getDashboardOrders,
  getTrandingTrends,
  getDashboardProducts,
} from "@/actions";
import { DashboardFilter } from "@/components/dashboard-filter";
import { DashboardStatistics } from "@/components/dashboard-statistics";
import { Trending } from "@/components/trending";
import { Card } from "@/components/ui/card";
import { OrdersChart } from "@/components/ui/orders-chart";
import {
  DASHBOARD_DEFAULT_FILTER,
  FetchTags,
} from "@/constants";

const { STATISTIC, TRENDS, DASHBOARD_ORDERS, DASHBOARD_PRODUCTS } = FetchTags;

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [STATISTIC, DASHBOARD_DEFAULT_FILTER],
    queryFn: async () => await getDashboardStats(DASHBOARD_DEFAULT_FILTER),
  });

  await queryClient.prefetchQuery({
    queryKey: [TRENDS, DASHBOARD_DEFAULT_FILTER],
    queryFn: async () => await getTrandingTrends(DASHBOARD_DEFAULT_FILTER),
  });

  await queryClient.prefetchQuery({
    queryKey: [DASHBOARD_ORDERS, DASHBOARD_DEFAULT_FILTER],
    queryFn: async () =>
      await getDashboardOrders(DASHBOARD_DEFAULT_FILTER),
  });

  await queryClient.prefetchQuery({
    queryKey: [DASHBOARD_PRODUCTS, DASHBOARD_DEFAULT_FILTER],
    queryFn: async () =>
      await getDashboardProducts(DASHBOARD_DEFAULT_FILTER),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack gap={3} sx={{ mt: 0 }}>
        <Typography component="h2" variant="h6">
          Overview
        </Typography>

        <DashboardFilter />

        <DashboardStatistics />

        <Grid container columns={{ md: 2, xs: 1 }} spacing={{ md: 3, xs: 2 }}>
          <Grid size={1}>
            <Card>
              <OrdersChart />
            </Card>
          </Grid>
          <Grid size={1}>
            <Card>
              <Trending />
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </HydrationBoundary>
  );
}
