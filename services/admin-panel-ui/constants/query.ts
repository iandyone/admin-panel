import { EOrderStatuses } from '@/types';

const {
  CANCELLED,
  COMPLETED,
  CREATED,
  DELIVERED,
  HOLD,
  PROCESSING,
  RETURNED,
  SHIPPED,
} = EOrderStatuses;

export const orderStatusesMap: Record<string, EOrderStatuses> = {
  created: CREATED,
  completed: COMPLETED,
  processing: PROCESSING,
  hold: HOLD,
  shipped: SHIPPED,
  delivered: DELIVERED,
  returned: RETURNED,
  cancelled: CANCELLED,
};
