import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidV4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './interfaces/album.interface';
import { validateId } from '../utils';
import { TrackService } from 'src/track/track.service';
import { AlbumDeletedEvent } from './events/album-deleted.event';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  constructor(
    private readonly trackService: TrackService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  getAll(): Album[] {
    return this.albums;
  }

  getOneById(id: string): Album {
    validateId(id);
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidV4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: CreateAlbumDto): Album {
    validateId(id);
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return album;
  }

  remove(id: string): void {
    validateId(id);
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.trackService.nullifyAlbumReferences(id);
    this.eventEmitter.emit('album.deleted', new AlbumDeletedEvent(id));

    this.albums.splice(index, 1);
  }

  nullifyArtistReferences(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
