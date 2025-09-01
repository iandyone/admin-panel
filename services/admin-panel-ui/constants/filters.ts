import { OrderFilter, UsersFilter } from '@/types';

export const LABELS_WITH_NUMERIC_FIELDS = ["id", "orders", "price", 'totalAmount'];

export const USERS_SEARCH_FILTERS = [
  "id",
  "firstName",
  "lastName",
  "role",
  "email",
  "phone",
  "lastActivity",
  "orders",
  "isActive",
  "dateFrom",
  "dateTo",
];

export const ORDERS_SEARCH_FILTERS = [
  'id',
  'order',
  'totalAmount',
  'location',
  'customer',
  'deliveryman',
  "date",
  'dateFrom',
  'dateTo',
  'manager',
  'status',
  "dateFromCreated",
  "dateToCreated",
  "dateFromUpdated",
  "dateToUpdated",
]

export const DASHBOARD_SEARCH_FILTERS = [
  'dateFrom',
  'dateTo',
]


export const USERS_DEFAULT_FILTER: Record<keyof UsersFilter, null> = {
  id: null,
  firstName: null,
  lastName: null,
  role: null,
  phone: null,
  email: null,
  lastActivity: null,
  orders: null,
  isActive: null,
  dateFrom: null,
  dateTo: null
}

export const ORDERS_DEFAULT_FILTER: Record<keyof OrderFilter, null> = {
  id: null,
  order: null,
  totalAmount: null,
  location: null,
  customer: null,
  deliveryman: null,
  date: null,
  manager: null,
  status: null,
  dateFromCreated: null,
  dateToCreated: null,
  dateFromUpdated: null,
  dateToUpdated: null,
  createdAt: null,
  updatedAt: null,
}

export const DASHBOARD_DEFAULT_FILTER = {
  dateFrom: null,
  dateTo: null,
}
