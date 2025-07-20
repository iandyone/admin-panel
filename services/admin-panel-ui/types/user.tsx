export interface UserData {
  id: number;
  name: string;
  role: string;
  phone: number | string;
  last_activity: number | string;
  orders: number;
  isActive?: boolean;
  status?: string;
}

export enum EUserRoles {
  ADMIN = "admin",
  MANAGER = "manager",
  DELIVERY = "delivery",
}

export enum EUserStatuses {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
