import { applyDecorators, ParseIntPipe, UsePipes } from '@nestjs/common';
import { idSchema } from 'src/validations/schemas';

import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';

export const UseId = () =>
  applyDecorators(UsePipes(new JoiValidationPipe(idSchema), ParseIntPipe));
