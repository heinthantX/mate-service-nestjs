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
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @IsUrl()
  @IsOptional()
  photoUrl: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  age: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(250)
  height: number;

  @IsString()
  @IsOptional()
  bodyType: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsString()
  @IsOptional()
  service: string;

  @IsMilitaryTime()
  @IsOptional()
  time: Date;

  @IsMilitaryTime()
  @IsOptional()
  responseTime: Date;

  @IsString()
  @IsOptional()
  status: string;
}
