import { OrdersTableHeaderConfig, UsersTableHeaderConfig } from '@/types';

export const ordersTableHeaderConfig: OrdersTableHeaderConfig = [
  {title: 'Id', key: "id", width: "1%", },
  {title: 'Order', key: "order", width: "20%" },
  {title: 'Amount', key: "totalAmount", width: "1%" },
  {title: 'Location', key: "location", width: "10%" },
  {title: 'Customer', key: "customer", width: "5%" },
  {title: 'Created At', key: "createdAt", width: "7%" },
  {title: 'Updated At', key: "updatedAt", width: "7%" },
  {title: 'Manager', key: "manager", width: "10%" },
  {title: 'Deliveryman', key: "deliveryman", width: "10%" },
  {title: 'Status', key: "status", width: "5%" },
];

export const usersTableHeaderConfig: UsersTableHeaderConfig = [
  { title: 'Id', key: "id", width: "1%" },
  { title: 'First Name', key: "firstName", width: "15%" },
  { title: 'Last Name', key: "lastName", width: "15%" },
  { title: 'Email', key: "email", width: "15%" },
  { title: 'Phone', key: "phone", width: "15%" },
  { title: 'Role', key: "role", width: "10%" },
  { title: 'Last Activity', key: "lastActivity", width: "15%" },
  { title: 'Orders', key: "orders", width: "5%" },
  { title: 'Status', key: "isActive", width: "10%" },
];
