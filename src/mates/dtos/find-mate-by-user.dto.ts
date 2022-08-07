import { ApiProperty } from '@nestjs/swagger';
import {
  IsMilitaryTime,
  IsNotEmpty,
  IsObject,
  IsString,
  isString,
} from 'class-validator';
import { time } from 'console';

export class FindMateByUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsMilitaryTime()
  time: Date;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsMilitaryTime()
  duration: Date;
}
