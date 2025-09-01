import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { Roles } from '../decorators';
import { UserAuthDtoProps } from '../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user: UserAuthDtoProps = request['user'];

    const roles = this.reflector.getAllAndMerge(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles.length) {
      return true;
    }

    const hasPermission = roles.includes(user.role);

    if (!hasPermission) {
      throw new ForbiddenException(
        `Unavailable for users with '${user.role}' role`,
      );
    }

    return hasPermission;
  }
}
