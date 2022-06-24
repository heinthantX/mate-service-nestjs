import {
  IsDataURI,
  IsEmail,
  IsMilitaryTime,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMateDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsUrl()
  PhotoUrl: string;

  @IsString()
  city: string;

  @IsNumber()
  rating: number;

  @IsString()
  gender: string;

  @IsNumber()
  age: number;

  @IsNumber()
  height: number;

  @IsString()
  bodyType: string;

  @IsString()
  language: string;

  @IsString()
  service: string;

  @IsMilitaryTime()
  time: string;

  @IsMilitaryTime()
  responseTime: string;
}
