import { Injectable } from '@nestjs/common';
import { Location } from './location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  /* TODO add creation and edit logic with validation
  create(run: Run) {
    this.runs.push(run);
  }
  */

  async findAll(): Promise<Location[]> {
    return this.locationsRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Location> {
    return this.locationsRepository.findOne({
      where: { id },
    });
  }

  async createOne(locationPayload: Partial<Location>): Promise<Location> {
    const newLocation = this.locationsRepository.create(locationPayload);
    return this.locationsRepository.save(newLocation);
  }

  async updateOne(
    id: string,
    locationPayload: Partial<Location>,
  ): Promise<Location> {
    await this.locationsRepository.update(id, locationPayload);
    return this.findOne(id);
  }
}
