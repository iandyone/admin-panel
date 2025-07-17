import { OrdersTableHeaderConfig, UsersTableHeaderConfig } from '@/types';

export const ordersTableHeaderConfig: OrdersTableHeaderConfig = [
  { title: "id", width: "5%", },
  { title: "order", width: "30%" },
  { title: "price", width: "7%" },
  { title: "location", width: "15%" },
  { title: "customer", width: "10%" },
  { title: "date", width: "6%" },
  { title: "manager", width: "15%" },
  { title: "status", width: "15%" },
];

export const usersTableHeaderConfig: UsersTableHeaderConfig = [
  { title: "id", width: "5%" },
  { title: "name", width: "30%" },
  { title: "role", width: "10%" },
  { title: "phone", width: "10%" },
  { title: "last_activity", width: "10%" },
  { title: "orders", width: "10%" },
  { title: "status", width: "10%" },
];
