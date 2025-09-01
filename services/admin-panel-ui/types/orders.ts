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
  CREATED = 'Created',
  COMPLETED = 'Completed',
  PROCESSING = 'Processing',
  HOLD = 'Hold',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  RETURNED = 'Returned',
  CANCELLED = 'Cancelled'
}

export interface OrderFilter {
  id: string;
  order: string;
  totalAmount: string;
  location: string;
  customer: string;
  date: string;
  dateFromCreated: string | number;
  dateToCreated: string | number;
  dateFromUpdated: string | number;
  dateToUpdated: string | number;
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
  email?: string;
  lastActivity?: string;
  orders?: string;
  isActive?: string;
  dateFrom?: string | number;
  dateTo?: string | number;
}

export interface DashboardFilter {
  dateFrom?: string | null;
  dateTo?: string | null;
}
