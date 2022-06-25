import { IsBoolean } from 'class-validator';

export class ChangeCompletionDto {
  @IsBoolean()
  completed: boolean;
}
