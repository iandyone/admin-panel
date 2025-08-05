import { $Enums } from '@prisma/client';
import { UsersFindAllProps } from 'src/types';

export class FindAllUsersDto {
  page: number;
  perPage: number;
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: string;
  dateFrom?: number;
  dateTo?: number;
  orders?: number;
  isActive?: boolean;

  constructor({
    page,
    perPage,
    id,
    firstName,
    lastName,
    phone,
    role,
    dateFrom,
    dateTo,
    orders,
    isActive,
  }: UsersFindAllProps) {
    this.page = Number(page);
    this.perPage = Number(perPage);
    this.id = Number(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = decodeURIComponent(phone ?? '');
    this.role = $Enums.Role[role?.toUpperCase()];
    this.dateFrom = Number(dateFrom);
    this.dateTo = Number(dateTo);
    this.orders = Number(orders);
    this.isActive = isActive !== undefined ? isActive === 'true' : undefined;
  }
}
