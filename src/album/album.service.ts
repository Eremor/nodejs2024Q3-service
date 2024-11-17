import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './interfaces/album.interface';
import { validateId } from '../utils';
import { TrackService } from 'src/track/track.service';
import { AlbumDeletedEvent } from './events/album-deleted.event';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly trackService: TrackService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getAll(): Promise<Album[]> {
    return await this.prismaService.album.findMany();
  }

  async getOneById(id: string): Promise<Album> {
    validateId(id);
    const album = await this.prismaService.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = await this.prismaService.album.create({
      data: createAlbumDto,
    });
    return newAlbum;
  }

  async update(id: string, updateAlbumDto: CreateAlbumDto): Promise<Album> {
    validateId(id);
    const album = await this.prismaService.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = await this.prismaService.album.update({
      where: { id },
      data: updateAlbumDto,
    });

    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    validateId(id);
    const album = await this.prismaService.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.trackService.nullifyAlbumReferences(id);
    this.eventEmitter.emit('album.deleted', new AlbumDeletedEvent(id));

    await this.prismaService.album.delete({
      where: { id },
    });
  }

  async nullifyArtistReferences(artistId: string): Promise<void> {
    await this.prismaService.album.updateMany({
      where: { artistId },
      data: {
        artistId: null,
      },
    });
  }
}
