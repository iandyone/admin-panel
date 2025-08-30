import { EPermissions } from '@/constants';
import { EOrderStatuses, EUserRoles } from '@/types';

const { DELIVERY, MANAGER } = EUserRoles;
const { PROCESSING, DELIVERED } = EOrderStatuses;
const { ADD_ORDER_BUTTON, EDIT_USER, EDIT_USER_ROLE, REMOVE_ORDER, EDIT_ORDER } = EPermissions;

export const PERMISSIONS_BY_ROLE_MAP: Record<EUserRoles, Set<EPermissions>> = {
  admin: new Set([...Object.values(EPermissions)]),
  manager: new Set([ADD_ORDER_BUTTON, EDIT_USER, EDIT_USER_ROLE, EDIT_ORDER, REMOVE_ORDER]),
  delivery: new Set([])
}

export const USER_ROLES_OPTIONS_MAP: Record<EUserRoles, string[]> = {
  admin: Object.values(EUserRoles),
  manager: [MANAGER, DELIVERY],
  delivery: []
}

export const ORDER_STATUSES_OPTIONS_MAP: Record<EUserRoles, string[]> = {
  admin: Object.values(EOrderStatuses),
  manager: Object.values(EOrderStatuses),
  delivery: [PROCESSING, DELIVERED]
}

