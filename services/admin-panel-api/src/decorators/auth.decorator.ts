import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

import { Roles } from './roles.decorator';

import { AuthGuard, RolesGuard } from '../guards';

export const Auth = (roles?: $Enums.Role[]) => {
  const decorators = [UseGuards(AuthGuard, RolesGuard), ApiBearerAuth()];

  if (roles) {
    decorators.push(Roles(roles));
  }

  return applyDecorators(...decorators);
};
