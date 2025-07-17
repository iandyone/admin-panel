import { OrderFilters, UsersFilter } from "@/types/orders";

export const USERS_FILTERS_DEFAULT: UsersFilter = {
  id: null,
  name: "",
  role: "",
  phone: "",
  last_activity: "",
  orders: "",
  status: "",
};
export const ORDERS_FILTERS: OrderFilters = {
  id: null,
  order: "",
  price: "",
  location: "",
  customer: "",
  date: "",
  manager: "",
  status: "",
};
