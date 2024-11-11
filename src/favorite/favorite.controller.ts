import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { Favorites } from './entities/favorite.entity';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Get all favorites movies, tracks and books',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Favorites,
  })
  getFavorites() {
    return this.favoriteService.getAll();
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: `Artist with id doesn't exist.`,
  })
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoriteService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  removeArtistFromFavorites(@Param('id') id: string) {
    return this.favoriteService.removeArtistFromFavorites(id);
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: `Album with id doesn't exist.`,
  })
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoriteService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  removeAlbumFromFavorites(@Param('id') id: string) {
    return this.favoriteService.removeAlbumFromFavorites(id);
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: `Track with id doesn't exist.`,
  })
  addTrackToFavorites(@Param('id') id: string) {
    return this.favoriteService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  removeTrackFromFavorites(@Param('id') id: string) {
    return this.favoriteService.removeTrackFromFavorites(id);
  }
}
