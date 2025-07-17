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

export type SortOrder = "desc" | "asc";

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
  id: number | null;
  order: string;
  price: string;
  location: string;
  customer: string;
  date: string;
  manager: string;
  status: string;
}

export interface UsersFilter {
  id: number | null;
  name: string;
  role: string;
  phone: string;
  last_activity: string;
  orders: string;
  status: string;
}
