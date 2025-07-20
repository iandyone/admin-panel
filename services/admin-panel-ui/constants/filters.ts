import { OrderFilters, UsersFilter } from "@/types/orders";

export const USERS_FILTERS_DEFAULT: UsersFilter = {
  id: '',
  name: "",
  role: "",
  phone: "",
  last_activity: "",
  orders: "",
  status: "",
};
export const ORDERS_FILTERS: OrderFilters = {
  id: '',
  order: "",
  price: "",
  location: "",
  customer: "",
  date: "",
  manager: "",
  status: "",
};


export const LABELS_WITH_NUMERIC_FIELS = ['id', 'orders', 'price']
