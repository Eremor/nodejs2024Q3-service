import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    type: Track,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'The Show Must Go On',
        },
        duration: {
          type: 'number',
          example: 262,
        },
        artistId: {
          type: 'string',
          format: 'uuid',
        },
        albumId: {
          type: 'string',
          format: 'uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tracks',
    description: 'Get all library tracks list',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [Track],
  })
  async findAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get track by id',
    description: 'Get single track by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  async findOne(@Param('id') id: string) {
    return this.trackService.getOneById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update track',
    description: 'Update library track information by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The track has been updated.',
    type: Track,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Bohemian Rhapsody',
        },
        duration: {
          type: 'number',
          example: 355,
        },
        artistId: {
          type: 'string',
          format: 'uuid',
        },
        albumId: {
          type: 'string',
          format: 'uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track by ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'The track has been deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  async remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
