export type UserRole = 'admin' | 'manager' | 'delivery' | 'deactivated';

export interface UserCredentials {
  email: string;
  password: string
};
