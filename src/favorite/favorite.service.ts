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
import { OnEvent } from '@nestjs/event-emitter';
import { ArtistDeletedEvent } from 'src/artist/events/artist-deleted.event';
import { AlbumDeletedEvent } from 'src/album/events/album-deleted.event';
import { TrackDeletedEvent } from 'src/track/events/track-deleted.event';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async getAll(): Promise<Favorite> {
    return await this.prismaService.favorite.findFirst({
      include: {
        artists: true,
        albums: true,
        tracks: true
      }
    });
  }

  async addArtistToFavorites(artistId: string): Promise<string | void> {
    validateId(artistId);
    try {
      const artist = await this.artistService.getArtistById(artistId);
      const favorite = await this.getAll()

      if (!favorite.artists.includes(artist)) {
        await this.prismaService.favorite.update({
          where: {
            id: favorite.id
          },
          data: {
            artists: {
              connect: {
                id: artistId
              }
            }
          }
        })
        return `Artist with id: ${artistId} added to favorites`;
      }
    } catch {
      throw new UnprocessableEntityException('Artist does not exist');
    }
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    validateId(artistId);
    const favorite = await this.getAll()
    const artistExists = favorite.artists.some((artist) => artist.id === artistId)

    if (!artistExists) {
      throw new NotFoundException('Artist is not in favorites');
    }

    await this.prismaService.favorite.update({
      where: {
        id: favorite.id
      },
      data: {
        artists: {
          disconnect: {
            id: artistId
          }
        }
      }
    })
  }

  @OnEvent('artist.deleted')
  async handleArtistDeleted(event: ArtistDeletedEvent): Promise<void> {
    await this.removeArtistFromFavorites(event.artistId)
  }

  async addAlbumToFavorites(albumId: string): Promise<string | void> {
    validateId(albumId);
    try {
      const album = await this.albumService.getOneById(albumId);
      const favorite = await this.getAll()

      if (!favorite.albums.includes(album)) {
        await this.prismaService.favorite.update({
          where: {
            id: favorite.id
          },
          data: {
            albums: {
              connect: {
                id: albumId
              }
            }
          }
        })
        return `Album with id: ${albumId} added to favorites`;
      }
    } catch {
      throw new UnprocessableEntityException('Album does not exist');
    }
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    validateId(albumId);
    const favorite = await this.getAll()
    const albumExists = favorite.albums.some((album) => album.id === albumId)

    if (!albumExists) {
      throw new NotFoundException('Album is not in favorites');
    }

    await this.prismaService.favorite.update({
      where: {
        id: favorite.id
      },
      data: {
        albums: {
          disconnect: {
            id: albumId
          }
        }
      }
    })
  }

  @OnEvent('album.deleted')
  async handleAlbumDeleted(event: AlbumDeletedEvent): Promise<void> {
    await this.removeAlbumFromFavorites(event.albumId)
  }

  async addTrackToFavorites(trackId: string): Promise<string | void> {
    validateId(trackId);
    try {
      const track = await this.trackService.getOneById(trackId);
      const favorite = await this.getAll()

      if (!favorite.tracks.includes(track)) {
        await this.prismaService.favorite.update({
          where: {
            id: favorite.id
          },
          data: {
            tracks: {
              connect: {
                id: trackId
              }
            }
          }
        })
        return `Track with id: ${trackId} added to favorites`;
      }
    } catch {
      throw new UnprocessableEntityException('Track does not exist');
    }
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    validateId(trackId);
    const favorite = await this.getAll()
    const trackExists = favorite.tracks.some((track) => track.id === trackId)

    if (!trackExists) {
      throw new NotFoundException('Track is not in favorites');
    }

    await this.prismaService.favorite.update({
      where: {
        id: favorite.id
      },
      data: {
        tracks: {
          disconnect: {
            id: trackId
          }
        }
      }
    })
  }

  @OnEvent('track.deleted')
  async handleTrackDeleted(event: TrackDeletedEvent): Promise<void> {
    await this.removeTrackFromFavorites(event.trackId)
  }
}
