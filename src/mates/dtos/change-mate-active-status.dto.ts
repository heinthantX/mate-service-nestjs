import { IsBoolean } from 'class-validator';

export class ChangeMateActiveStatusDto {
  @IsBoolean()
  online: boolean;
}
