"use client";

import { Card, Grid } from "@mui/material";
import { FC, useMemo } from "react";

import { useGetDashboardStatistics } from "@/query";

import { StatisticCard } from "../ui/statistic-card";

export const DashboardStatistics: FC = () => {
  const { data: statistics } = useGetDashboardStatistics();

  const STATISTICS_DATA = useMemo(() => {
    return [
      {
        id: 1,
        title: "Total orders",
        value: statistics?.total.count || 0,
        chip: {
          isPositive: true,
          value: 25,
        },
        key: "total",
        data: statistics?.total.data || [],
        days: statistics?.total.days || [],
      },
      {
        id: 2,
        title: "Completed",
        value: statistics?.completed.count || 0,
        chip: {
          isPositive: false,
          value: 9,
        },
        key: "completed",
        data: statistics?.completed.data || [],
        days: statistics?.completed.days || [],
      },
      {
        id: 3,
        title: "Canceled",
        value: statistics?.cancelled.count || 0,
        chip: {
          isPositive: true,
          value: 3,
        },
        key: "cancelled",
        data: statistics?.cancelled.data || [],
        days: statistics?.cancelled.days || [],
      },
      {
        id: 4,
        title: "Benefits",
        value: statistics?.benefit.count || 0,
        chip: {
          isPositive: true,
          value: 10,
        },
        key: "benefits",
        data: statistics?.benefit.data || [],
        days: statistics?.benefit.days || [],
      },
    ];
  }, [statistics]);

  return (
    <Grid
      container
      spacing={{ md: 3, xs: 2 }}
      columns={{ md: 4, sm: 2, xs: 1 }}
    >
      {STATISTICS_DATA.map(({ id, chip, data, days, title, value }) => (
        <Grid key={id} size={1}>
          <Card>
            <StatisticCard
              chip={chip}
              days={days}
              data={data}
              title={title}
              value={value}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
