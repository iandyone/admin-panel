import { Order, User } from "@/types";

export function isOrderData(data: Order | User): data is Order {
  return "order" in data;
}

export function isUserData(data: Order | User): data is User {
  return "role" in data;
}
