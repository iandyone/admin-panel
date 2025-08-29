"use client";

import { Stack, Typography } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";
import { FC, useMemo } from "react";

import { PieChartDefaultSettings } from "@/configs";
import { useAppSearchParams } from "@/hooks";
import { useGetDashboardOrders } from "@/query";

export const OrdersChart: FC = () => {
  const { searchParams } = useAppSearchParams();

  const {
    data: orders,
    isSuccess: isOrdersFetchingSuccess,
    isFetching,
  } = useGetDashboardOrders({
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

  return (
    <Stack justifyContent="space-between">
      <Stack>
        <Typography textAlign="center">Orders by status, %</Typography>
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
            {...PieChartDefaultSettings}
          />
        )}
      </Stack>
    </Stack>
  );
};
