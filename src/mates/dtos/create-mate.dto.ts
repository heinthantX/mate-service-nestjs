import {
  IsEmail,
  IsMilitaryTime,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateMateDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber()
  phone: string;

  @IsUrl()
  photoUrl: string;

  @IsString()
  city: string;

  @IsString()
  gender: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  age: number;

  @IsNumber()
  @Min(0)
  @Max(250)
  height: number;

  @IsString()
  bodyType: string;

  @IsString()
  language: string;

  @IsString()
  service: string;

  @IsMilitaryTime()
  time: Date;

  @IsMilitaryTime()
  response_time: Date;
}
