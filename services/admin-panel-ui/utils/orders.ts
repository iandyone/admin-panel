/* eslint-disable @typescript-eslint/no-explicit-any */
type Order = "asc" | "desc";

export function getSortedOrdersData<T extends Record<string, any>>(
  arr: T[],
  key: string,
  order: Order = "asc",
): T[] {
  return [...arr].sort((a, b) => {
    const primaryValue = a[key];
    const secondaryValue = b[key];
    let cmp = 0;

    if (typeof primaryValue === "number") {
      cmp = primaryValue - secondaryValue;
    } else if (typeof primaryValue === "string") {
      cmp = primaryValue.localeCompare(secondaryValue, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    } else if (primaryValue > secondaryValue) {
      cmp = 1;
    } else if (primaryValue < secondaryValue) {
      cmp = -1;
    }

    return order === "asc" ? cmp : -cmp;
  });
}
