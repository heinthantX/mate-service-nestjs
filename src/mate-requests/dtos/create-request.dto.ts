import {
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateRequestDto {
  @IsString()
  location: string;

  @IsDateString()
  time: Date;

  @IsMilitaryTime()
  duration: Date;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  specialRequest: string;
}
