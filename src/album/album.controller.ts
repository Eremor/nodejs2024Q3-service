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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    type: Album,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Innuendo',
        },
        year: {
          type: 'number',
          example: 1991,
        },
        artistId: {
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
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all albums',
    description: 'Get all library albums list',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [Album],
  })
  async findAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get album by id',
    description: 'Get single album by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  async findOne(@Param('id') id: string) {
    return this.albumService.getOneById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album',
    description: 'Update library album information by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The album has been updated.',
    type: Album,
    example: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'A Night at the Opera',
      year: 1975,
      artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'A Night at the Opera',
        },
        year: {
          type: 'number',
          example: 1975,
        },
        artistId: {
          type: 'string',
          format: 'uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album by ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'The album has been deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  async remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}
