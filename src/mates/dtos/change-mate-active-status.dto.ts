import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ChangeMateActiveStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  online: boolean;
}
