import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { runType } from './run.entity';
import { Location } from '../locations/location.entity';

export class RunDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  stravaRouteId: string;

  @IsOptional()
  @IsString()
  stravaEventId: string;

  @IsOptional()
  @IsString()
  meetUpEventId: string;

  @IsOptional()
  @IsString()
  facebookEventId: string;

  @IsNotEmpty()
  @IsDateString()
  eventDate: Date;

  @IsNotEmpty()
  @IsString()
  runType: runType;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: Location;
}
