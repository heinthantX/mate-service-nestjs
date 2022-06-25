import { IsMilitaryTime, IsNumber, Min } from 'class-validator';

export class UpdateMatePriceDto {
  @IsMilitaryTime()
  duration: Date;

  @IsNumber()
  @Min(0)
  price: number;
}
