import { Module } from '@nestjs/common';
import { LocationsService } from './location.service';
import { LocationsController } from './location.controller';
import { Location } from './location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
