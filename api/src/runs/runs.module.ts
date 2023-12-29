import { Module } from '@nestjs/common';
import { RunsService } from './runs.service';
import { RunsController } from './runs.controller';
import { Run } from './run.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Run])],
  controllers: [RunsController],
  providers: [RunsService],
})
export class RunsModule {}
