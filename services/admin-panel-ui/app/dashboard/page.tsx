import { Grid, Stack, Typography } from "@mui/material";

import { OrdersChart } from '@/components/orders-chart';
import { PeriodFilter } from "@/components/period-filter";
import { Trending } from "@/components/trending";
import { Card } from "@/components/ui/card";
import { Showcase } from "@/components/ui/showcase";
import { SHOWCASES_DATA } from "@/mocks";

export default function Page() {
  return (
    <Stack gap={3} sx={{ mt: 0 }}>
      <Typography component="h2" variant="h6">
        Overview
      </Typography>

      <PeriodFilter />

      <Grid
        container
        spacing={{ md: 3, xs: 2 }}
        columns={{ md: 4, sm: 2, xs: 1 }}
      >
        {SHOWCASES_DATA.map(({ id, ...showcaseProps }) => (
          <Grid key={id} size={1}>
            <Card>
              <Showcase {...showcaseProps} />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={{ md: 3, xs: 2 }} columns={{ md: 2, xs: 1 }}>
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
  );
}
