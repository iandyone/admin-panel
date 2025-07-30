import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  role: string | null;
  isActive: boolean | null;

  constructor({
    firstName,
    lastName,
    role,
    phone,
    isActive,
  }: Partial<CreateUserDto & { isActive: boolean; role: string }>) {
    this.firstName = firstName ?? null;
    this.lastName = lastName ?? null;
    this.phone = phone ?? null;
    this.role = role ?? null;
    this.isActive = isActive ?? null;
  }
}
