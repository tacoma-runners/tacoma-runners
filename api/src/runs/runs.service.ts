import { Injectable } from '@nestjs/common';
import { Run, runStatus } from './run.entity';
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

  async findAll(): Promise<Run[]> {
    return this.runsReposity.find({
      where: { status: runStatus.published },
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
        status: runStatus.published,
        eventDate: Between(dateStart, dateEnd),
        ...(runType && { runType }),
      },
      relations: {
        location: true,
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
          status: runStatus.published,
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

  async findOne(id: string): Promise<Run> {
    return this.runsReposity.findOne({
      where: { id, status: runStatus.published },
      relations: {
        location: true,
      },
    });
  }

  async createOne(runsPayload: Partial<Run>): Promise<Run> {
    console.log({
      ...runsPayload,
      status: runStatus.pending,
    });
    const newRun = this.runsReposity.create({
      ...runsPayload,
      status: runStatus.pending,
    });
    await this.runsReposity.save(newRun);
    return this.adminFindOne(newRun.id);
  }

  async updateOne(id: string, runsPayload: Partial<Run>): Promise<Run> {
    await this.runsReposity.update(id, runsPayload);
    return this.findOne(id);
  }

  async publishOne(id: string): Promise<Run> {
    await this.runsReposity.update(id, { status: runStatus.published });
    return this.findOne(id);
  }

  async archiveOne(id: string): Promise<Run> {
    await this.runsReposity.update(id, { status: runStatus.archived });
    return this.findOne(id);
  }

  async adminFindAll(): Promise<Run[]> {
    return this.runsReposity.find({
      order: { eventDate: 'DESC' },
      relations: {
        location: true,
      },
    });
  }

  async adminFindOne(id: string): Promise<Run> {
    return this.runsReposity.findOne({
      where: { id },
      relations: {
        location: true,
      },
    });
  }
}
