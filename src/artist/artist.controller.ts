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
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: CreateArtistDto) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
