import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './interfaces/track.interface';
import { validateId } from '../utils';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

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

    this.tracks.splice(index, 1);
  }
}
