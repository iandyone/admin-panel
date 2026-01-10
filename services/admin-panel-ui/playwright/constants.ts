export const ADMIN_NAVIGATION_LINKS = ['Dashboard', 'Orders', 'Users'];
export const PROTECTED_ROUTES = ['DASHBOARD', 'ORDERS', 'USERS'] as const;

export enum EPlaywrightProjects {
  SETUP = 'setup',
  AUTH = 'Chrome|Auth',
  ADMIN = 'Chrome|Admin',
  MANAGER = 'Chrome|Manager',
  DELIVERY = 'Chrome|Delivery',
  DEACTIVATED = 'Chrome|Deactivated',
}

export const ORDERS_TABLE_COLUMNS = [
  'Id',
  'Order',
  'Amount',
  'Location',
  'Customer',
  'Created',
  'Updated',
  'Manager',
  'Deliveryman',
  'Status',
];

export const USERS_TABLE_COLUMNS = [
  'Id',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Role',
  'Last Activity',
  'Orders',
  'Status',
];

