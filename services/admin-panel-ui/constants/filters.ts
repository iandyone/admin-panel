export const LABELS_WITH_NUMERIC_FIELDS = ["id", "orders", "price"];

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
  'price',
  'location',
  'customer',
  'date',
  'dateFrom',
  'dateTo',
  'manager',
  'status',
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
