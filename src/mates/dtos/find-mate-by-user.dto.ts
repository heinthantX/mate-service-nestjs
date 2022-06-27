import { IsMilitaryTime, IsObject, IsString } from 'class-validator';

export class FindMateByUserDto {
  @IsString()
  city: string;

  @IsString()
  gender: string;

  @IsMilitaryTime()
  time: Date;

  @IsMilitaryTime()
  duration: Date;
}
