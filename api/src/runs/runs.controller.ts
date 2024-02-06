import { Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { Run } from './run.entity';
import { RunsService } from './runs.service';
import { AuthGuard } from '@nestjs/passport';

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
  async findOne(@Param('id') id: string): Promise<Run | null> {
    return this.runsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateOne(@Param('id') id: string): Promise<Run | null> {
    return this.runsService.updateOne(id);
  }
}
