import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { SignInDto } from './dto/sign-in.dto';
import { UserAuthDto } from './dto/user-auth.dto';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto) {
    const {
      User: { firstName, lastName, isActive },
      ...userCredentials
    } = await this.usersService.findByEmail(email);

    const isCredentialsValid = await bcrypt.compare(
      password,
      userCredentials.password,
    );

    if (!isCredentialsValid) {
      throw new UnauthorizedException({
        message: `Wrong password`,
      });
    }

    const userAuthDto = new UserAuthDto({
      ...userCredentials,
      firstName,
      lastName,
      isActive,
    });

    const access_token = await this.jwtService.signAsync(
      { ...userAuthDto },
      { expiresIn: '1d' },
    );

    return access_token;
  }
}
