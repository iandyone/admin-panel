import { OrderData, UserData } from "@/types";

export function isOrderData(data: OrderData | UserData): data is OrderData {
  return "order" in data;
}

export function isUserData(data: OrderData | UserData): data is UserData {
  return "role" in data;
}
