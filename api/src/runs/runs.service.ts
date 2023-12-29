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
    return this.runsReposity.find({ order: { eventDate: 'DESC' } });
  }

  async findUpcoming(runType = null): Promise<Run> {
    // Look for next run but with 6 hour buffer after last one
    const dateEnd = new Date(new Date().setHours(new Date().getHours() + 162));
    const dateStart = new Date(new Date().setDate(new Date().getDate() - 60));

    const test = await this.runsReposity.find({
      where: {
        eventDate: Between(dateStart, dateEnd),
        ...(runType && { runType }),
      },
      order: { eventDate: 'DESC' },
      take: 1,
    });
    return test[0];
  }

  findOne(id: number): Promise<Run> {
    return this.runsReposity.findOne({ where: { id } });
  }
}
