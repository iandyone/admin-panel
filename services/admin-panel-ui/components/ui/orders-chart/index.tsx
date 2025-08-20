"use client";

import { Stack, Typography } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";
import { FC } from "react";

import { useAppSearchParams } from "@/hooks";
import { useGetDashboardOrders, useGetDashboardProducts } from "@/query";

export const OrdersChart: FC = () => {
  const { searchParams } = useAppSearchParams();

  const { data: orders } = useGetDashboardOrders({
    dateFrom: searchParams.get("dateFrom"),
    dateTo: searchParams.get("dateTo"),
  });

  const { data: products } = useGetDashboardProducts({
    dateFrom: searchParams.get("dateFrom"),
    dateTo: searchParams.get("dateTo"),
  });

  const ordersChartData: PieValueType[] =
    orders?.map(({ status, percent }) => ({
      label: status,
      value: percent,
    })) || [];

  const productsChartData: PieValueType[] =
    products?.map(({ percent, category }) => ({
      label: category,
      value: percent,
    })) || [];

  const settings = {
    width: 276,
    height: 276,
    hideLegend: true,
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack>
        <Typography textAlign="center">Orders by statuses, %</Typography>
        <PieChart
          series={[
            {
              innerRadius: 50,
              outerRadius: 100,
              data: ordersChartData,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -10, color: "gray" },
              paddingAngle: 2,
            },
          ]}
          {...settings}
        />
      </Stack>
      <Stack>
        <Typography textAlign="center">Sold categories (completed), %</Typography>
        <PieChart
          series={[
            {
              innerRadius: 50,
              outerRadius: 100,
              data: productsChartData,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -10, color: "gray" },
              paddingAngle: 2,
            },
          ]}
          {...settings}
        />
      </Stack>
    </Stack>
  );
};
