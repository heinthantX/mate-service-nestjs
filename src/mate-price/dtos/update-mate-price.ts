import { ApiProperty } from '@nestjs/swagger';
import { IsMilitaryTime, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateMatePriceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMilitaryTime()
  duration: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
