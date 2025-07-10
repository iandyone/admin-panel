"use client";

import { useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { FC } from "react";

import { TRENDING_DATA } from "@/mocks/dashboard";
import { seriesValueFormatterAxis as valueFormatter } from "@/utils";

export const OrdersChart: FC = () => {
  const theme = useTheme();

  return (
    <BarChart
      height={271}
      dataset={TRENDING_DATA}
      series={[
        {
          dataKey: "orders",
          label: "Orders",
          color: theme.palette.primary.dark,
        },
      ]}
      xAxis={[
        { dataKey: "date", valueFormatter },
        { dataKey: "year", position: "bottom" },
      ]}
    />
  );
};
