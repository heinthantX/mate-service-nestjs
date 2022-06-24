import { IsMilitaryTime, IsNumber, Min } from 'class-validator';

export class CreateMatePriceDto {
  @IsMilitaryTime()
  duration: Date;

  @IsNumber()
  @Min(0)
  price: number;
}
