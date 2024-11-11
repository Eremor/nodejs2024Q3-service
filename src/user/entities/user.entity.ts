import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

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
  createdAt: number;

  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  updatedAt: number;
}
