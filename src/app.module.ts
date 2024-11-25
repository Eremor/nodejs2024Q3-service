import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoriteModule,
    PrismaModule,
  ],
})
export class AppModule {}
