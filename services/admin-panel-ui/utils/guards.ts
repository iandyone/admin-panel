import { ORDERS_FILTERS, USERS_FILTERS_DEFAULT } from "@/constants";
import { OrderData, UserData } from "@/types";
import { OrderFilters, UsersFilter } from "@/types/orders";

export function isOrderData(data: OrderData | UserData): data is OrderData {
  return "order" in data;
}

export function isUserData(data: OrderData | UserData): data is UserData {
  return "role" in data;
}

export function isOrdersFilterLabel(
  label: keyof OrderFilters | string,
): label is keyof OrderFilters {
  return Object.keys(ORDERS_FILTERS).includes(label);
}

export function isUsersFilterLabel(
  label: keyof UsersFilter | string,
): label is keyof UsersFilter {
  return Object.keys(USERS_FILTERS_DEFAULT).includes(label);
}
