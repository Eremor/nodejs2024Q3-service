import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidV4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './interfaces/track.interface';
import { validateId } from '../utils';
import { TrackDeletedEvent } from './events/track-deleted.event';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  constructor(private readonly eventEmitter: EventEmitter2) {}

  getAll(): Track[] {
    return this.tracks;
  }

  getOneById(id: string): Track {
    validateId(id);
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidV4(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: CreateTrackDto): Track {
    validateId(id);
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;

    return track;
  }

  remove(id: string) {
    validateId(id);
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    this.eventEmitter.emit('track.deleted', new TrackDeletedEvent(id));

    this.tracks.splice(index, 1);
  }

  nullifyAlbumReferences(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  nullifyArtistReferences(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
}
