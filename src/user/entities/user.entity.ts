import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

export class User {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'TestUser',
  })
  login: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  version: number;

  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}
