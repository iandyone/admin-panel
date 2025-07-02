import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

import { SparkLine } from "@/components/ui/spark-line";

interface Props {
  title: string;
  value: ReactNode;
  chip?: {
    isPositive: boolean;
    value: ReactNode;
  };
  data?: number[];
}

export const Showcase: FC<Props> = ({ title, value, chip, data }) => {
  return (
    <Stack direction="column" gap={1}>
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
              Last 30 days
            </Typography>

            <Box sx={{ width: "100%", height: 50 }}>
              <SparkLine
                value={value}
                data={data}
                type={chip?.isPositive ? "positive" : "negative"}
              />
            </Box>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
