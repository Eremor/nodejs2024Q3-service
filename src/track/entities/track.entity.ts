import { ApiProperty } from "@nestjs/swagger";

export class Track {
  @ApiProperty({
    type: 'string',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'The Show Must Go On'
  })
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    nullable: true
  })
  artistId: string | null;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    nullable: true
  })
  albumId: string | null;

  @ApiProperty({
    type: 'number',
    example: 262,
    description: 'In seconds'
  })
  duration: number;
}
