import { Expose, Transform, Type } from 'class-transformer';
import { MatePrice } from '../../mate-price/mate-price.entity';
import { Mate } from '../mate.entity';

export class MateDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  photoUrl: string;

  @Expose()
  city: string;

  @Expose()
  rating: number;

  @Expose()
  gender: string;

  @Expose()
  age: number;

  @Expose()
  height: number;

  @Expose()
  bodyType: string;

  @Expose()
  language: string;

  @Expose()
  service: string;

  @Expose()
  verified: boolean;

  @Expose()
  time: Date;

  @Expose()
  online: boolean;

  @Expose()
  response_time: Date;

  @Expose()
  @Transform(({ obj }) => obj.matePrices)
  matePrices: MatePrice[];
}
