"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import { FC } from "react";

export const Chart: FC = () => {
  return (
    <>
      <LineChart
        showToolbar
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            // area: true,
            stack: "test",
            curve: "catmullRom",

            showMark: false,
          },
          {
            data: [4, 11, 4, 17, 3, 10],
            // area: true,
            stack: "test",
          },
        ]}
        height={300}
        // width={300}
        hideLegend
        grid={{ vertical: true }}
      />
    </>
  );
};
