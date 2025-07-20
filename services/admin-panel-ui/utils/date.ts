import moment from "moment";

export function getShortMonthName(monthIndex: number) {
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return shortMonths[monthIndex] ?? null;
}

export function getFormatedDate(date: string | number) {
  return moment(date).format("DD.MM.YYYY");
}
