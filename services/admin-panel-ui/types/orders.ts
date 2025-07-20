export type SortOrder = "desc" | "asc";

export interface OrderData {
  id: number;
  date: string;
  customer: string;
  manager: string;
  location: string;
  price: string;
  status: string;
  order: string;
}

export enum EOrderStatuses {
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  PROCESSING = "Processing",
  EXPIRED = "Expired",
  PENDING = "Pending",
  SHIPPED = "Shipped",
  REFUNDED = "Refunded",
}

export interface OrderFilters {
  id: string;
  order: string;
  price: string;
  location: string;
  customer: string;
  date: string;
  manager: string;
  status: string;
}

export interface UsersFilter {
  id: string;
  name: string;
  role: string;
  phone: string;
  last_activity: string;
  orders: string;
  status: string;
}
