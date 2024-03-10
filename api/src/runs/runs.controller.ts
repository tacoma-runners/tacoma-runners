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

  @Get('?')
  async findAll(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<Run[]> {
    return this.runsService.findAll(page, take);
  }

  @Get('upcoming')
  async findUpcoming(@Query('runType') runType?: string): Promise<Run | null> {
    return this.runsService.findUpcoming(runType);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('publish/:id')
  publish(@Param('id') id: string) {
    return this.runsService.publishOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('archive/:id')
  archive(@Param('id') id: string) {
    return this.runsService.archiveOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin?')
  async adminFindAll(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<Run[]> {
    return this.runsService.adminFindAll(page, take);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/:id')
  async adminFindOne(@Param('id') id: string): Promise<Run> {
    return this.runsService.adminFindOne(id);
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
