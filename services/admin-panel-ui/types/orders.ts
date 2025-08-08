export type SortOrder = "desc" | "asc";

export interface Order {
  id: number,
  order: string,
  totalAmount: string,
  location: string,
  customer: string,
  createdAt: string,
  updatedAt: string,
  manager: string,
  managerId?: number,
  deliveryman?: string,
  deliverymanId?: number,
  status: string
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

export interface OrderFilter {
  id: string;
  order: string;
  totalAmount: string;
  location: string;
  customer: string;
  date: string;
  dateFrom: string | number;
  dateTo: string | number;
  manager: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deliveryman: string;
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
