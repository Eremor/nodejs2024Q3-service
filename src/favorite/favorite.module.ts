import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule],
  controllers: [FavoriteController],
  providers: [FavoriteService, PrismaService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
