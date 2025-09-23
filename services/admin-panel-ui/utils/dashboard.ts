import { AxisValueFormatterContext } from "@mui/x-charts";

import { ShowcaseDataMock } from "@/types";
import { getShortMonthName } from "@/utils/date";

export const getOrdersChartData = (data: ShowcaseDataMock[]) => {
  return data
    .map(({ value, title }, index) => ({
      id: index + 1,
      value: Number(value),
      label: title,
    }))
    .filter(({ label }) => label !== "Benefits");
};

export const seriesValueFormatterAxis = (
  date: Date,
  { location }: AxisValueFormatterContext,
) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const monthString = getShortMonthName(month);

  return location === "tick" ? monthString : `${day} ${monthString} ${year}`;
};
