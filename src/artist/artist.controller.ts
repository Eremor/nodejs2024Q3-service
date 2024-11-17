import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist information',
  })
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    type: Artist,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Freddie Mercury',
        },
        grammy: {
          type: 'boolean',
          example: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Get all library artists list',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [Artist],
  })
  async findAll() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get artist by id',
    description: 'Get single artist by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async findOne(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update artist',
    description: 'Update artist information by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Artist,
    example: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Freddie Mercury',
      grammy: true,
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Freddie Mercury',
        },
        grammy: {
          type: 'boolean',
          example: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async update(@Param('id') id: string, @Body() updateArtistDto: CreateArtistDto) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist by ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'The artist has been deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async remove(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
