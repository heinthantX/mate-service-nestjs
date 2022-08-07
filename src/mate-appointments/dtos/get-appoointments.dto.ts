import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNotEmpty } from 'class-validator';

export class GetAppointmentsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBooleanString()
  completed: boolean;
}
