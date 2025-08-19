import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

import { SparkLine } from "@/components/ui/spark-line";
import { StatisticDatasetItem } from "@/types";

interface Props extends StatisticDatasetItem {
  title: string;
  value: number;

  chip?: {
    isPositive: boolean;
    value: ReactNode;
  };
}

export const StatisticCard: FC<Props> = ({
  title,
  value,
  chip,
  data,
  days,
}) => {
  return (
    <Stack direction="column" gap={1} padding={2}>
      <Typography component="h2" variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      <Stack
        direction="column"
        sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
      >
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography
              variant="h4"
              component="span"
              sx={{ fontSize: 24, fontWeight: 700 }}
            >
              {value}
            </Typography>
            {chip && (
              <Chip
                size="small"
                color={chip.isPositive ? "success" : "error"}
                label={`${chip.value}%`}
              />
            )}
          </Stack>
        </Stack>

        {data?.length && (
          <Box sx={{ height: "100%" }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Current period
            </Typography>

            <Stack justifyContent='flex-start' sx={{ width: "100%", height: 50 }}>
              <SparkLine
                value={value}
                data={data}
                days={days}
                type={chip?.isPositive ? "positive" : "negative"}
              />
            </Stack>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
