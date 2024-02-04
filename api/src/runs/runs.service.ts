import { Injectable } from '@nestjs/common';
import { Run } from './run.entity';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RunsService {
  constructor(
    @InjectRepository(Run)
    private runsReposity: Repository<Run>,
  ) {}

  /* TODO add creation and edit logic with validation
  create(run: Run) {
    this.runs.push(run);
  }
  */

  findAll(): Promise<Run[]> {
    return this.runsReposity.find({
      order: { eventDate: 'DESC' },
      relations: {
        location: true,
      },
    });
  }

  async findUpcoming(runType = null): Promise<Run> {
    // Look for next run but with 6 hour buffer after last one
    const dateEnd = new Date(new Date().setHours(new Date().getHours() + 164));
    const dateStart = new Date(new Date().setHours(new Date().getHours() - 4));

    let runs = await this.runsReposity.find({
      where: {
        eventDate: Between(dateStart, dateEnd),
        ...(runType && { runType }),
      },
      order: { eventDate: 'ASC' },
      take: 1,
    });

    if (runs.length === 0) {
      const newDateStart = new Date(
        new Date().setDate(new Date().getDate() - 60),
      );
      runs = await this.runsReposity.find({
        where: {
          eventDate: Between(newDateStart, dateEnd),
          ...(runType && { runType }),
        },
        relations: {
          location: true,
        },
        order: { eventDate: 'DESC' },
        take: 1,
      });
    }

    return runs[0];
  }

  findOne(id: number): Promise<Run> {
    return this.runsReposity.findOne({
      where: { id },
      relations: {
        location: true,
      },
    });
  }

  updateOne(id: number): Promise<Run> {
    return this.runsReposity.findOne({
      where: { id },
      relations: {
        location: true,
      },
    });
  }
}
