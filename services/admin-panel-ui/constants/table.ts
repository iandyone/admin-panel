import { HeaderData } from '@/types';
import { TrendItem } from '@/types/dashboard';

export const DEFAULT_ROWS_PER_PAGE = 15;
export const ROWS_PER_PAGE_OPTIONS = [DEFAULT_ROWS_PER_PAGE, 25, 50];

export const ordersTableHeaderConfig: HeaderData[] = [
  { title: "id", width: "5%", withFilter: false },
  { title: "order", width: "30%" },
  { title: "price", width: "7%" },
  { title: "customer", width: "10%" },
  { title: "location", width: "15%" },
  { title: "date", width: "6%" },
  { title: "manager", width: "15%" },
  { title: "status", width: "15%" },
];


export const usersTableHeaderConfig: HeaderData[] = [
  { title: "id", width: "5%" },
  { title: "name", width: "30%" },
  { title: "role", width: "10%" },
  { title: "phone", width: "10%" },
  { title: "last_activity", width: "10%" },
  { title: "orders", width: "10%" },
  { title: "status", width: "10%" },
];

export const TRANDS: TrendItem[] = [
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
