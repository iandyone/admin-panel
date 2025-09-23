import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Schema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  transform(value?: any) {
    const { value: validatedValue, error } = this.schema.validate(value, {
      abortEarly: false,
      convert: true,
      stripUnknown: true,
    });

    if (error) {
      throw new BadRequestException({
        error: 'Validation failed',
        message: error.message.replace(/(\"|\[|\d\])/g, ''),
      });
    }

    return validatedValue;
  }
}
