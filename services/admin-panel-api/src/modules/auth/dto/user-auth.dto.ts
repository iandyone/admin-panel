import { $Enums, Credentials, User } from '@prisma/client';

export class UserAuthDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: $Enums.Role;

  constructor({
    userId,
    firstName,
    lastName,
    isActive,
    email,
    role,
  }: Credentials & Pick<User, 'firstName' | 'lastName' | 'isActive'>) {
    this.id = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
    this.email = email;
    this.role = role;
  }
}
