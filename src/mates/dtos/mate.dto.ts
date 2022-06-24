import { Expose } from 'class-transformer';

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
  status: string;

  @Expose()
  responseTime: Date;
}
