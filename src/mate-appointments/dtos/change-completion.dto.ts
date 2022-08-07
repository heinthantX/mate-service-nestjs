import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ChangeCompletionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
