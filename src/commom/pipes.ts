import { PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodTypeAny) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new UnprocessableEntityException(result.error.issues);
    }

    return result.data;
  }
}
