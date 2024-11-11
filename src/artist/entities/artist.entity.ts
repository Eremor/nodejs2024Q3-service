import { ApiProperty } from "@nestjs/swagger";

export class Artist {
  @ApiProperty({
    type: 'string',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Freddie Mercury'
  })
  name: string;

  @ApiProperty({
    type: 'boolean',
    example: false
  })
  grammy: boolean;
}
