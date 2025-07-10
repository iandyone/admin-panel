export interface OrderData {
  id: number;
  date: string;
  customer: string;
  manager: string
  location: string;
  price: number;
  status: string;
  order:string;
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
