import { Stack, Typography } from "@mui/material";
import { FC } from "react";

import { TrendingRow } from "@/components/ui/trending-row";
import { TRENDS } from "@/constants";

export const Trending: FC = () => {
  return (
    <Stack spacing={3} height={300}>
      <Stack>
        <Typography
          component="h2"
          variant="body1"
          fontSize={22}
          fontWeight="700"
        >
          Trending Items
        </Typography>
        <Typography component="h2" variant="caption">
          Most selling items
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {TRENDS.map((trendItem, index) => (
          <TrendingRow key={trendItem.id} index={index + 1} {...trendItem} />
        ))}
      </Stack>
    </Stack>
  );
};
