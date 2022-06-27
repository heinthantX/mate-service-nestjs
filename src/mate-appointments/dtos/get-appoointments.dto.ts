import { Transform } from 'class-transformer';
import { IsBoolean, IsBooleanString } from 'class-validator';

export class GetAppointmentsDto {
  @IsBooleanString()
  completed: boolean;
}
