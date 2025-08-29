"use client";

import { Stack, Typography } from "@mui/material";
import { FC } from "react";

import { TrendingRow } from "@/components/ui/trending-row";
import { useAppSearchParams } from "@/hooks";
import { useGetDashboardTrends } from "@/query";

export const TrendingProductsBar: FC = () => {
  const { searchParams } = useAppSearchParams();

  const { data, isSuccess } = useGetDashboardTrends({
    dateFrom: searchParams.get("dateFrom"),
    dateTo: searchParams.get("dateTo"),
  });

  return (
    <Stack spacing={2}>
      <Typography component="h2" variant="body1" fontSize={18} fontWeight="700">
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
  );
};
