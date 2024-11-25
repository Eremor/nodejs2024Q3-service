import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService],
  exports: [AlbumService],
})
export class AlbumModule {}
