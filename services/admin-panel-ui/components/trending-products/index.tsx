"use client";

import { Card, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { TrendingRow } from "@/components/ui/trending-row";
import { useAppSearchParams } from "@/hooks";
import { useGetDashboardTrends } from "@/query";

import { DashboardPieChartLoader } from '../loaders/dashboard-pie-charts-loader';

export const TrendingProductsBar: FC = () => {
  const { searchParams } = useAppSearchParams();

  const { data, isSuccess, isFetching } = useGetDashboardTrends({
    dateFrom: searchParams.get("dateFrom"),
    dateTo: searchParams.get("dateTo"),
  });

  if (isFetching) {
    return <DashboardPieChartLoader />;
  }

  return (
    <Card sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography
          component="h2"
          variant="body1"
          fontSize={18}
          fontWeight="700"
        >
          Trending Products
        </Typography>
        {isSuccess && (
          <Stack spacing={1}>
            {data.map((trendItem, index) => (
              <TrendingRow
                key={trendItem.productId}
                index={index + 1}
                {...trendItem}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
};
