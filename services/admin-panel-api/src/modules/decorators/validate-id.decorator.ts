import { applyDecorators, ParseIntPipe, UsePipes } from '@nestjs/common';

import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { idSchema } from '../../validations/common.schema';

export const UseId = () =>
  applyDecorators(UsePipes(new JoiValidationPipe(idSchema), ParseIntPipe));
