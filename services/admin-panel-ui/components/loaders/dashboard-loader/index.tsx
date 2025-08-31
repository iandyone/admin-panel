import { Grid, Stack } from "@mui/material";
import { FC } from "react";

import { SkeletonLoader } from "../skeleton-loader";

export const DashboardLoader: FC = () => {
  return (
    <Stack rowGap={3}>
      <Stack direction='row' gap={2}>
        <SkeletonLoader variant="rounded" height={30} width={260} />
        <SkeletonLoader variant="rounded" height={30} width={260} />
        <SkeletonLoader variant="rounded" height={30} width={80} />
      </Stack>

      <Grid
        container
        spacing={{ md: 3, xs: 2 }}
        columns={{ md: 4, sm: 2, xs: 1 }}
      >
        {new Array(4).fill(0).map((item, index) => (
          <Grid key={index} size={1}>
            <SkeletonLoader variant="rounded" height={180} />
          </Grid>
        ))}
      </Grid>

      <Grid container columns={{ md: 2, xs: 1 }} spacing={{ md: 3, xs: 2 }}>
        {new Array(3).fill(0).map((item, index) => (
          <Grid key={index} size={1}>
            <SkeletonLoader variant="rounded" height={300} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
