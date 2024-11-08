import { BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

export const validateId = (id: string): void => {
  if (!validate(id)) {
    throw new BadRequestException('not UUID');
  }
};
