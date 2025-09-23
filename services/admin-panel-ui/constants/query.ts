import { EOrderStatuses } from '@/types';

const {
  CANCELLED,
  COMPLETED,
  CREATED,
  DELIVERED,
  HOLD,
  PROCESSING,
  RETURNED,
  SHIPPED,
} = EOrderStatuses;

export const orderStatusesMap: Record<string, EOrderStatuses> = {
  created: CREATED,
  completed: COMPLETED,
  processing: PROCESSING,
  hold: HOLD,
  shipped: SHIPPED,
  delivered: DELIVERED,
  returned: RETURNED,
  cancelled: CANCELLED,
};

export const FetchTags = {
  USERS: "users",
  ORDERS: "orders",
  EMPLOYEE: "employee",
  PRODUCTS: "products",
  STATISTIC: "statistic",
  TRENDS: "trends",
  DASHBOARD_ORDERS: "dashboard-orders",
  DASHBOARD_PRODUCTS: "dashboard-products",
};
