import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Run } from './run.entity';
import { RunsService } from './runs.service';
import { AuthGuard } from '@nestjs/passport';
import { RunDto } from './run.dto';

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
  @Post()
  create(@Body() _runDto: RunDto) {
    return this.runsService.createOne(_runDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() _runDto: RunDto) {
    return this.runsService.updateOne(id, _runDto);
  }
}
