import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class UpdateMateDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password: string;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  photoUrl: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  gender: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  age: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(250)
  height: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bodyType: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  language: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  service: string;

  @ApiPropertyOptional()
  @IsMilitaryTime()
  @IsOptional()
  time: Date;

  @ApiPropertyOptional()
  @IsMilitaryTime()
  @IsOptional()
  response_time: Date;
}
