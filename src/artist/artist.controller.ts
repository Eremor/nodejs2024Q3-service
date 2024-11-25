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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiBearerAuth()
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
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid'
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Get all library artists list',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [Artist],
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid'
  })
  async findAll() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  @ApiBearerAuth()
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
    status: 401,
    description: 'Access token is missing or invalid'
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async findOne(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update artist',
    description: 'Update artist information by ID',
  })
  @ApiResponse({
    status: 200,
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
    status: 401,
    description: 'Access token is missing or invalid'
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
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
    status: 401,
    description: 'Access token is missing or invalid'
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async remove(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
