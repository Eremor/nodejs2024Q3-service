import { ApiProperty } from "@nestjs/swagger";

export class Album {
  @ApiProperty({
    type: 'string',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Innuendo'
  })
  name: string;

  @ApiProperty({
    type: 'number',
    example: 1991,
  })
  year: number;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    nullable: true
  })
  artistId: string | null;
}
