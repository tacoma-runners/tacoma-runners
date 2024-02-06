import { IsAlpha, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  streetAddress: string;

  @IsNotEmpty()
  @IsAlpha()
  city: string;

  @IsNotEmpty()
  @IsAlpha()
  state: string;

  @IsNotEmpty()
  @IsInt()
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;
}
