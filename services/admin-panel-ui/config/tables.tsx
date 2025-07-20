import { OrdersTableHeaderConfig, UsersTableHeaderConfig } from '@/types';

export const ordersTableHeaderConfig: OrdersTableHeaderConfig = [
  {title: 'Id', key: "id", width: "5%", },
  {title: 'Order', key: "order", width: "30%" },
  {title: 'Price', key: "price", width: "7%" },
  {title: 'Location', key: "location", width: "15%" },
  {title: 'Customer', key: "customer", width: "10%" },
  {title: 'Date', key: "date", width: "6%" },
  {title: 'Manager', key: "manager", width: "15%" },
  {title: 'Status', key: "status", width: "15%" },
];

export const usersTableHeaderConfig: UsersTableHeaderConfig = [
  { title: 'Id', key: "id", width: "5%" },
  { title: 'Name', key: "name", width: "30%" },
  { title: 'Role', key: "role", width: "10%" },
  { title: 'Phone', key: "phone", width: "10%" },
  { title: 'Activity', key: "last_activity", width: "10%" },
  { title: 'Orders', key: "orders", width: "10%" },
  { title: 'Status', key: "status", width: "10%" },
];
