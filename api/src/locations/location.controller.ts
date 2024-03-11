import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Location } from './location.entity';
import { LocationsService } from './location.service';
import { LocationDto } from './location.dto';
import { AuthGuard } from '@nestjs/passport';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Controller('locations')
export class LocationsController {
  constructor(
    private locationsService: LocationsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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
  async create(@Body() _locationDto: LocationDto) {
    await this.cacheManager.reset();
    return this.locationsService.createOne(_locationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() _locationDto: LocationDto) {
    await this.cacheManager.reset();
    return this.locationsService.updateOne(id, _locationDto);
  }
}
