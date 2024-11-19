import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { validateId } from '../utils';
import { TrackDeletedEvent } from './events/track-deleted.event';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly prismaService: PrismaService,
  ) {}

  async getAll(): Promise<Track[]> {
    return this.prismaService.track.findMany();
  }

  async getOneById(id: string): Promise<Track> {
    validateId(id);
    const track = await this.prismaService.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = await this.prismaService.track.create({
      data: {
        ...createTrackDto,
      },
    });
    return newTrack;
  }

  async update(id: string, updateTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.getOneById(id)

    if (track) {
      const updatedTrack = await this.prismaService.track.update({
        where: { id },
        data: updateTrackDto,
      });
  
      return updatedTrack;
    }
  }

  async remove(id: string) {
    const track = await this.getOneById(id)

    if (track) {
      this.eventEmitter.emit('track.deleted', new TrackDeletedEvent(id));
  
      await this.prismaService.track.delete({
        where: { id },
      });
    }

  }

  async nullifyAlbumReferences(albumId: string): Promise<void> {
    await this.prismaService.track.updateMany({
      where: { albumId },
      data: {
        albumId: null,
      },
    });
  }

  async nullifyArtistReferences(artistId: string): Promise<void> {
    await this.prismaService.track.updateMany({
      where: { artistId },
      data: {
        artistId: null,
      },
    });
  }
}
