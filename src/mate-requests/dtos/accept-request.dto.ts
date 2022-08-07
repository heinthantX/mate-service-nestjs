import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class AcceptRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  accepted: boolean;
}
