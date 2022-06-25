import { IsDateString, IsMilitaryTime, IsString } from 'class-validator';

export class AddRequestDto {
  @IsString()
  location: string;

  @IsDateString()
  time: Date;

  @IsDateString()
  duration: Date;

  @IsString()
  specialRequest: string;
}
