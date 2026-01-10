"use client";

import { Card, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { TrendingRow } from "@/components/ui/trending-row";
import { useAppSearchParams } from "@/hooks";
import { useGetDashboardTrends } from "@/query";

import { DashboardPieChartLoader } from "../loaders/dashboard-pie-charts-loader";

interface Props {
  testIdPrefix: string;
}

export const TrendingProductsBar: FC<Props> = ({ testIdPrefix }) => {
  const { searchParams } = useAppSearchParams();

  const { data, isSuccess, isFetching } = useGetDashboardTrends({
    dateFrom: searchParams.get("dateFrom"),
    dateTo: searchParams.get("dateTo"),
  });

  if (isFetching) {
    return <DashboardPieChartLoader />;
  }

  return (
    <Card sx={{ padding: 2 }} data-test-id={testIdPrefix}>
      <Stack spacing={2}>
        <Typography
          component="h2"
          variant="body1"
          fontSize={18}
          fontWeight="700"
          data-test-id={`${testIdPrefix}-title`}
        >
          Trending Products
        </Typography>
        {isSuccess && (
          <Stack spacing={1}>
            {data.map((trendItem, index) => (
              <TrendingRow
                key={trendItem.productId}
                index={index + 1}
                testIdPrefix={`${testIdPrefix}-row`}
                {...trendItem}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
};
