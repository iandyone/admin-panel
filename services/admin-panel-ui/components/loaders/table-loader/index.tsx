import { Stack } from "@mui/material";
import { FC } from "react";

import { DEFAULT_ROWS_PER_PAGE } from "@/constants";

import { SkeletonLoader } from "../skeleton-loader";

export const TableLoader: FC = () => {
  return (
    <Stack>
      <SkeletonLoader
        variant="rounded"
        height={40}
        sx={{ bgcolor: "grey.300" }}
      />
      {new Array(DEFAULT_ROWS_PER_PAGE).fill(0).map((row, index) => (
        <SkeletonLoader
          key={index}
          variant="rectangular"
          height={34}
          sx={{ bgcolor: index % 2 === 0 ? "grey.100" : "grey.200" }}
        />
      ))}
      <Stack
        direction="row"
        columnGap={2}
        justifyContent="flex-end"
        marginTop={2}
      >
        <SkeletonLoader variant="rounded" height={20} width={100} />
        <SkeletonLoader variant="rounded" height={20} width={48} />
        <SkeletonLoader variant="rounded" height={20} width={76} />
        <SkeletonLoader variant="rounded" height={20} width={80} />
      </Stack>
    </Stack>
  );
};
