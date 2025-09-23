import { Stack } from "@mui/material";
import { FC } from "react";

import { SkeletonLoader } from "../skeleton-loader";

export const DashboardPieChartLoader: FC = () => {
  return (
    <Stack justifyContent="space-between" height={332}>
      <SkeletonLoader height={332} />
    </Stack>
  );
};
