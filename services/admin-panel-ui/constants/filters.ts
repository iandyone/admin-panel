export const LABELS_WITH_NUMERIC_FIELDS = ["id", "orders", "price", 'totalAmount'];

export const USERS_SEARCH_FILTERS = [
  "id",
  "firstName",
  "lastName",
  "role",
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

export const USERS_DEFAULT_FILTER = {
  id: null,
  firstName: null,
  lastName: null,
  role: null,
  phone: null,
  lastActivity: null,
  orders: null,
  isActive: null,
  dateFrom: null,
  dateTo: null
}

export const ORDERS_DEFAULT_FILTER = {
  id: null,
  order: null,
  totalAmount: null,
  location: null,
  customer: null,
  deliveryman: null,
  date: null,
  dateFrom: null,
  dateTo: null,
  manager: null,
  status: null,
  dateFromCreated: null,
  dateToCreated: null,
  dateFromUpdated: null,
  dateToUpdated: null,
}
