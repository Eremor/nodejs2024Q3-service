import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  getFavorites() {
    return this.favoriteService.getAll();
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoriteService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id') id: string) {
    return this.favoriteService.removeArtistFromFavorites(id);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoriteService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id') id: string) {
    return this.favoriteService.removeAlbumFromFavorites(id);
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') id: string) {
    return this.favoriteService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id') id: string) {
    return this.favoriteService.removeTrackFromFavorites(id);
  }
}
