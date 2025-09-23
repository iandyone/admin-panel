"use client";

import { useTheme } from "@mui/material";
import { areaElementClasses, SparkLineChart } from "@mui/x-charts";
import { FC, ReactNode } from "react";

import { AreaGradient } from "@/components/ui/area-gradient";
import { StatisticDatasetItem } from "@/types";

interface Props extends StatisticDatasetItem {
  value: ReactNode;
  type: "positive" | "negative";
}

export const SparkLine: FC<Props> = ({ data, days, type, value }) => {
  const {
    palette: { success, error },
  } = useTheme();

  const color = type === "positive" ? success.light : error.light;

  return (
    <SparkLineChart
      color={color}
      data={data}
      area
      showHighlight
      showTooltip
      xAxis={{
        scaleType: "band",
        data: days,
      }}
      sx={{
        [`& .${areaElementClasses.root}`]: {
          fill: `url(#area-gradient-${value})`,
        },
      }}
    >
      <AreaGradient color={color} id={`area-gradient-${value}`} />
    </SparkLineChart>
  );
};
