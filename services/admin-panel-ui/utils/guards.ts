import { OrderData, User } from "@/types";

export function isOrderData(data: OrderData | User): data is OrderData {
  return "order" in data;
}

export function isUserData(data: OrderData | User): data is User {
  return "role" in data;
}
