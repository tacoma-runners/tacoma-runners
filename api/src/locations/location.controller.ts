import { Controller, Get, Param } from '@nestjs/common';
import { Location } from './location.entity';
import { LocationsService } from './location.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Location | null> {
    return this.locationsService.findOne(id);
  }
}
