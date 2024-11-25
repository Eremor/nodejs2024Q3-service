import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { validateId } from '../utils';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistDeletedEvent } from './events/artist-deleted.event';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly trackServices: TrackService,
    private readonly albumServices: AlbumService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    return await this.prismaService.artist.findMany();
  }

  async getArtistById(id: string): Promise<Artist> {
    validateId(id);
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = await this.prismaService.artist.create({
      data: createArtistDto,
    });

    return newArtist;
  }

  async updateArtist(
    id: string,
    updateArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    validateId(id);
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = await this.prismaService.artist.update({
      where: { id },
      data: updateArtistDto,
    });

    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    validateId(id);
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.trackServices.nullifyArtistReferences(id);
    this.albumServices.nullifyArtistReferences(id);

    this.eventEmitter.emit('artist.deleted', new ArtistDeletedEvent(id));

    await this.prismaService.artist.delete({
      where: { id },
    });
  }
}
