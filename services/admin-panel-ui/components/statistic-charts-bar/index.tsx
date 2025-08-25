"use client";

import { Stack, Typography } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";
import { FC, useMemo } from "react";

import { useAppSearchParams } from "@/hooks";
import { useGetDashboardOrders, useGetDashboardProducts } from "@/query";

const settings = {
  width: 276,
  height: 276,
  hideLegend: true,
};

export const StatisticChartsBar: FC = () => {
  const { searchParams } = useAppSearchParams();

  const {
    data: orders,
    isSuccess: isOrdersFetchingSuccess,
    isFetching,
  } = useGetDashboardOrders({
    dateFrom: searchParams.get("dateFrom"),
    dateTo: searchParams.get("dateTo"),
  });

  const { data: products, isSuccess: isProductsFetchingSuccess } =
    useGetDashboardProducts({
      dateFrom: searchParams.get("dateFrom"),
      dateTo: searchParams.get("dateTo"),
    });

  const ordersChartData: PieValueType[] = useMemo(
    () =>
      isOrdersFetchingSuccess
        ? orders.map(({ status, percent }) => ({
            label: status,
            value: percent,
          }))
        : [],
    [orders, isOrdersFetchingSuccess],
  );

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

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack>
        <Typography textAlign="center">Orders by statuses, %</Typography>
        {/* TODO: loader */}
        {isFetching ? (
          <div>1</div>
        ) : (
          <PieChart
            series={[
              {
                innerRadius: 50,
                outerRadius: 100,
                data: ordersChartData,
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -10,
                  color: "gray",
                },
                paddingAngle: 2,
              },
            ]}
            {...settings}
          />
        )}
      </Stack>
      <Stack>
        <Typography textAlign="center">
          Sold categories (completed), %
        </Typography>
        {/* TODO: loader */}
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
