import { OrderFilters, UsersFilter } from "@/types/orders";

export const USERS_FILTERS_DEFAULT: UsersFilter = {
  id: "",
  name: "",
  role: "",
  phone: "",
  last_activity: "",
  orders: "",
  status: "",
  dateFrom: "",
  dateTo: "",
};
export const ORDERS_FILTERS: OrderFilters = {
  id: "",
  order: "",
  price: "",
  location: "",
  customer: "",
  dateFrom: "",
  dateTo: "",
  manager: "",
  status: "",
  date: "",
};

export const LABELS_WITH_NUMERIC_FIELS = ["id", "orders", "price"];
