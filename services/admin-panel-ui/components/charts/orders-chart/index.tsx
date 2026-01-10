"use client";

import { Card, Stack, Typography } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";
import { FC, useMemo } from "react";

import { DashboardPieChartLoader } from "@/components/loaders/dashboard-pie-charts-loader";
import { PieChartDefaultSettings } from "@/configs";
import { useAppSearchParams } from "@/hooks";
import { useGetDashboardOrders } from "@/query";

interface Props {
  testIdPrefix: string;
}

export const OrdersChart: FC<Props> = ({ testIdPrefix }) => {
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

  if (isFetching) {
    return <DashboardPieChartLoader />;
  }

  return (
    <Card sx={{ padding: 2 }} data-test-id={testIdPrefix}>
      <Stack justifyContent="space-between">
        <Stack>
          <Typography
            textAlign="center"
            data-test-id="page-dashboard-charts-bar-chart-title"
          >
            Orders by status, %
          </Typography>
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
        </Stack>
      </Stack>
    </Card>
  );
};
