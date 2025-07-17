import { OrderFilters, UsersFilter } from "@/types/orders";

export const USERS_FILTERS_DEFAULT: UsersFilter = {
  id: 0,
  name: "",
  role: "",
  phone: "",
  last_activity: "",
  orders: "",
  status: "",
};
export const ORDERS_FILTERS: OrderFilters = {
  id: 0,
  order: "",
  price: "",
  location: "",
  customer: "",
  date: "",
  manager: "",
  status: "",
};
