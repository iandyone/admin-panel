import { Grid, Stack, Typography } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { forbidden, unauthorized } from "next/navigation";

import {
  getDashboardStats,
  getDashboardOrders,
  getTrandingTrends,
  getDashboardProducts,
} from "@/actions";
import { OrdersChart } from "@/components/charts/orders-chart";
import { ProductsGroupChart } from "@/components/charts/products-chart";
import { DashboardFilter } from "@/components/dashboard-filter";
import { DashboardStatistics } from "@/components/dashboard-statistics";
import { TrendingProductsBar } from "@/components/trending-products";
import { auth } from "@/configs";
import {
  DASHBOARD_DEFAULT_FILTER,
  FetchTags,
  PAGES_ACCESSING_MAP,
} from "@/constants";
import { EUserRoles } from "@/types";

const { STATISTIC, TRENDS, DASHBOARD_ORDERS, DASHBOARD_PRODUCTS } = FetchTags;

export default async function Page() {
  const session = await auth();

  if (!session) {
    unauthorized();
  }

  const role = session?.user.role.toLowerCase() as EUserRoles;

  if (!PAGES_ACCESSING_MAP.dashboard?.includes(role as EUserRoles)) {
    forbidden();
  }

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
    queryFn: async () => await getDashboardOrders(DASHBOARD_DEFAULT_FILTER),
  });

  await queryClient.prefetchQuery({
    queryKey: [DASHBOARD_PRODUCTS, DASHBOARD_DEFAULT_FILTER],
    queryFn: async () => await getDashboardProducts(DASHBOARD_DEFAULT_FILTER),
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
            <OrdersChart />
          </Grid>
          <Grid size={1}>
            <ProductsGroupChart />
          </Grid>
        </Grid>
        <Grid size={1}>
          <TrendingProductsBar />
        </Grid>
      </Stack>
    </HydrationBoundary>
  );
}
