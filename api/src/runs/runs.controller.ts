import { Controller, Get, Param, Query } from '@nestjs/common';
import { Run } from './run.entity';
import { RunsService } from './runs.service';

@Controller('runs')
export class RunsController {
  constructor(private runsService: RunsService) {}

  @Get()
  async findAll(): Promise<Run[]> {
    return this.runsService.findAll();
  }

  @Get('upcoming')
  async findUpcoming(@Query('runType') runType?: string): Promise<Run | null> {
    return this.runsService.findUpcoming(runType);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Run | null> {
    return this.runsService.findOne(id);
  }
}
