export interface UserData {
  id: number;
  name: string;
  role: string;
  phone: number | string;
  last_activity: string;
  orders: number;
  isActive?: boolean;
  status?: string;
}
