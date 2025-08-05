export type SortOrder = "desc" | "asc";

export interface OrderData {
  id: number;
  date: number | string;
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
  dateFrom: string | number;
  dateTo: string | number;
  manager: string;
  status: string;
}

export interface UsersFilter {
  id?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  phone?: string;
  lastActivity?: string;
  orders?: string;
  isActive?: string;
  dateFrom?: string | number;
  dateTo?: string | number;
}
