import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interfaces/track.interface';

export interface Favorite {
  id: string;
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
