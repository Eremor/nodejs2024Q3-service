import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { Album } from "src/album/entities/album.entity";
import { Artist } from "src/artist/entities/artist.entity";
import { Track } from "src/track/entities/track.entity";

export class Favorites {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(Artist)
    }
  })
  artists: Artist[];

  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(Album)
    }
  })
  albums: Album[];

  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(Track)
    }
  })
  tracks: Track[];
}