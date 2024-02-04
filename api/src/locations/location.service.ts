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

  findAll(): Promise<Location[]> {
    return this.locationsRepository.find({
      order: { id: 'DESC' },
    });
  }

  findOne(id: number): Promise<Location> {
    return this.locationsRepository.findOne({
      where: { id },
    });
  }
}
