"use client";

import { Card, Stack, Typography } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";
import { FC, useMemo } from "react";

import { DashboardPieChartLoader } from "@/components/loaders/dashboard-pie-charts-loader";
import { PieChartDefaultSettings } from "@/configs";
import { useAppSearchParams } from "@/hooks";
import { useGetDashboardProducts } from "@/query";

export const ProductsGroupChart: FC = () => {
  const { searchParams } = useAppSearchParams();

  const {
    data: products,
    isSuccess: isProductsFetchingSuccess,
    isFetching,
  } = useGetDashboardProducts({
    dateFrom: searchParams.get("dateFrom"),
    dateTo: searchParams.get("dateTo"),
  });

  const productsChartData: PieValueType[] = useMemo(
    () =>
      isProductsFetchingSuccess
        ? products.map(({ percent, category }) => ({
            label: category,
            value: percent,
          }))
        : [],
    [products, isProductsFetchingSuccess],
  );

  if (isFetching) {
    return <DashboardPieChartLoader />;
  }

  return (
    <Card sx={{ padding: 2 }}>
      <Stack justifyContent="space-between">
        <Typography textAlign="center">
          Products categories (completed orders), %
        </Typography>
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
          {...PieChartDefaultSettings}
        />
      </Stack>
    </Card>
  );
};
