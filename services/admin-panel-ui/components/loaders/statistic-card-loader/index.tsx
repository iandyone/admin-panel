import { Stack } from "@mui/material";
import { FC } from "react";

import { SkeletonLoader } from '../skeleton-loader';

export const StatisticCardLoader: FC = () => {
  return (
    <Stack direction="column" gap={1} padding={2} sx={{ minHeight: 178 }}>
      <SkeletonLoader width={100} variant="rounded" />
      <Stack
        direction="column"
        sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <SkeletonLoader width={40} variant="text" />
          <SkeletonLoader width={30} variant="text" />
        </Stack>
        <SkeletonLoader height={22} width={100} variant="text" />
        <SkeletonLoader height={50} variant="text" />
      </Stack>
    </Stack>
  );
};
