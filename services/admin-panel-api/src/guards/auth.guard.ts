import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { UserAuthDtoProps } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeaderData = request.headers['authorization'];

    if (!authHeaderData) {
      throw new UnauthorizedException();
    }

    try {
      const token = authHeaderData.replace('Bearer ', '');
      const user = this.jwtService.verify<UserAuthDtoProps>(token);

      if (!user.isActive) {
        throw new ForbiddenException('Account is deactivated');
      }

      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException('Token expired');
    }

    return true;
  }
}
