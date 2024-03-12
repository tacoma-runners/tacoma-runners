import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { VercelResponse } from '@vercel/node';
import { Run } from './run.entity';
import { RunsService } from './runs.service';
import { AuthGuard } from '@nestjs/passport';
import { RunDto } from './run.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Controller('runs')
export class RunsController {
  constructor(
    private runsService: RunsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('?')
  async findAll(
    @Res() res: VercelResponse,
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<Run[]> {
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    const runs = await this.runsService.findAll(page, take);
    res.status(200).json(runs);
    return runs;
  }

  @Get('upcoming')
  async findUpcoming(
    @Res() res: VercelResponse,
    @Query('runType') runType?: string,
  ): Promise<Run | null> {
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    const upcomingRun = await this.runsService.findUpcoming(runType);
    res.status(200).json(upcomingRun);
    return upcomingRun;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('publish/:id')
  async publish(@Param('id') id: string) {
    await this.cacheManager.reset();
    return this.runsService.publishOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('archive/:id')
  async archive(@Param('id') id: string) {
    await this.cacheManager.reset();
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
  async create(@Body() _runDto: RunDto) {
    await this.cacheManager.reset();
    return this.runsService.createOne(_runDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() _runDto: RunDto) {
    await this.cacheManager.reset();
    return this.runsService.updateOne(id, _runDto);
  }
}
