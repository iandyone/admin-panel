import { Grid, Stack, Typography } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getDashboardStats } from "@/actions";
import { DashboardStatistics } from "@/components/dashboard-statistics";
import { PeriodFilter } from "@/components/period-filter";
import { Trending } from "@/components/trending";
import { Card } from "@/components/ui/card";
import { OrdersChart } from "@/components/ui/orders-chart";
import { FetchTags } from "@/constants";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [FetchTags.DASHBOARD],
    queryFn: async () => await getDashboardStats(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack gap={3} sx={{ mt: 0 }}>
        <Typography component="h2" variant="h6">
          Overview
        </Typography>

        <PeriodFilter
          containerProps={{
            spacing: { md: 3, xs: 2 },
            columns: { md: 4, xs: 2 },
          }}
        />

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
