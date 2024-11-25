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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiBearerAuth()
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
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid'
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all albums',
    description: 'Get all library albums list',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [Album],
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid'
  })
  async findAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  @ApiBearerAuth()
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
    status: 401,
    description: 'Access token is missing or invalid'
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  async findOne(@Param('id') id: string) {
    return this.albumService.getOneById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update album',
    description: 'Update library album information by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The album has been updated.',
    type: Album,
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
    status: 401,
    description: 'Access token is missing or invalid'
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
  @ApiBearerAuth()
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
    status: 401,
    description: 'Access token is missing or invalid'
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  async remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}
