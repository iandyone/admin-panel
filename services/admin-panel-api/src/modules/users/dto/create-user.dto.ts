import { UserData } from '../../../types';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;

  constructor({ firstName, lastName, phone, email, password }: UserData) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
}
