import { TrendItem } from "@/types/dashboard";

export const START_PAGE = 0;
export const DEFAULT_ROWS_PER_PAGE = 15;
export const ROWS_PER_PAGE_OPTIONS = [DEFAULT_ROWS_PER_PAGE, 25, 50];

export const TRENDS: TrendItem[] = [
  {
    id: 1,
    title: "Pizza Meal for Kids (Small size)",
    category: "pizza",
    price: 9.5,
    sales: 524,
  },
  {
    id: 2,
    title: "Medium spicy spaghetti Italiano",
    category: "spaghetti",
    price: 12.35,
    sales: 215,
  },
  {
    id: 3,
    title: "Watermelon Juice with Ice",
    category: "drink",
    price: 14.99,
    sales: 97,
  },
];

