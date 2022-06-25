import { IsBoolean } from 'class-validator';

export class AcceptRequestDto {
  @IsBoolean()
  accepted: boolean;
}
