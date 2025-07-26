import { Credentials, Order, User } from '@prisma/client';

export interface AppConfig {
  PORT_API: number;
}

export type UserData = User & Credentials;

export type OrderData = Order & { productsIds: string[] };
