import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorite } from './interfaces/favorite.interface';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { validateId } from 'src/utils';

@Injectable()
export class FavoriteService {
  private favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  getAll(): Favorite {
    return this.favorites;
  }

  addArtistToFavorites(artistId: string): string | void {
    validateId(artistId);
    try {
      const artist = this.artistService.getArtistById(artistId);

      if (!this.favorites.artists.includes(artist)) {
        this.favorites.artists.push(artist);
        return `Artist with id: ${artistId} added to favorites`;
      }
    } catch {
      throw new UnprocessableEntityException('Artist does not exist');
    }
  }

  removeArtistFromFavorites(artistId: string) {
    validateId(artistId);
    const index = this.favorites.artists.findIndex(
      (artist) => artist.id === artistId,
    );

    if (index === -1) {
      throw new NotFoundException('Artist is not in favorites');
    }

    this.favorites.artists.splice(index, 1);
  }

  addAlbumToFavorites(albumId: string): string | void {
    validateId(albumId);
    try {
      const album = this.albumService.getOneById(albumId);

      if (!this.favorites.albums.includes(album)) {
        this.favorites.albums.push(album);
        return `Album with id: ${albumId} added to favorites`;
      }
    } catch {
      throw new UnprocessableEntityException('Album does not exist');
    }
  }

  removeAlbumFromFavorites(albumId: string) {
    validateId(albumId);
    const index = this.favorites.albums.findIndex(
      (album) => album.id === albumId,
    );

    if (index === -1) {
      throw new NotFoundException('Album is not in favorites');
    }

    this.favorites.albums.splice(index, 1);
  }

  addTrackToFavorites(trackId: string): string | void {
    validateId(trackId);
    try {
      const track = this.trackService.getOneById(trackId);

      if (!this.favorites.tracks.includes(track)) {
        this.favorites.tracks.push(track);
        return `Track with id: ${trackId} added to favorites`;
      }
    } catch {
      throw new UnprocessableEntityException('Track does not exist');
    }
  }

  removeTrackFromFavorites(trackId: string) {
    validateId(trackId);
    const index = this.favorites.tracks.findIndex(
      (track) => track.id === trackId,
    );

    if (index === -1) {
      throw new NotFoundException('Track is not in favorites');
    }

    this.favorites.tracks.splice(index, 1);
  }
}
