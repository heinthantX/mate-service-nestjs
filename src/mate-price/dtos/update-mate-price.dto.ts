import { IsMilitaryTime, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateMatePriceDto {
  @IsMilitaryTime()
  @IsOptional()
  duration: Date;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;
}
