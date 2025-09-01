import { applyDecorators, UseGuards } from '@nestjs/common';
import { $Enums } from '@prisma/client';

import { Roles } from './roles.decorator';

import { AuthGuard, RolesGuard } from '../guards';

export const Auth = (roles?: $Enums.Role[]) => {
  const decorators = [UseGuards(AuthGuard, RolesGuard)];

  if (roles) {
    decorators.push(Roles(roles));
  }

  return applyDecorators(...decorators);
};
