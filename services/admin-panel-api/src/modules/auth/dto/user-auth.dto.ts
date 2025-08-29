import { $Enums } from '@prisma/client';
import { UserAuthDtoProps } from 'src/types';

export class UserAuthDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: $Enums.Role;
  isNewUser?: boolean;

  constructor({
    userId,
    firstName,
    lastName,
    isActive,
    email,
    role,
    isNewUser,
  }: UserAuthDtoProps) {
    this.id = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
    this.email = email;
    this.role = role;
    this.isNewUser = isNewUser;
  }
}
