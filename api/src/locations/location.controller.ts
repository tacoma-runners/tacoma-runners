import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Location } from './location.entity';
import { LocationsService } from './location.service';
import { LocationDto } from './location.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Location | null> {
    return this.locationsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() _locationDto: LocationDto) {
    return this.locationsService.createOne(_locationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() _locationDto: LocationDto) {
    return this.locationsService.updateOne(id, _locationDto);
  }
}
