import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;

  constructor(
    id: number,
    { firstName, lastName, email, phone }: Partial<CreateUserDto>,
  ) {
    this.id = id;
    this.firstName = firstName || null;
    this.lastName = lastName || null;
    this.phone = phone || null;
    this.email = email || null;
  }
}
