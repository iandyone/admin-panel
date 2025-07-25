import { Credentials, User } from '@prisma/client';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;

  constructor({
    firstName,
    lastName,
    phone,
    email,
    password,
  }: User & Credentials) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
}
