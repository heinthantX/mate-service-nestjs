import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { MateAuthGuard } from '../guards/mate-auth.guard';
import { UserAuthGuard } from '../guards/user-auth.guard';
import { CurrentMate } from '../mates/decorators/current-mate.decorator';
import { Mate } from '../mates/mate.entity';
import { ChangeCompletionDto } from './dtos/change-completion.dto';
import { MateAppointmentsService } from './mate-appointments.service';

@Controller('mates/appointments')
export class MateAppointmentsController {
  constructor(private mateAppointementsService: MateAppointmentsService) {}

  @Get()
  @UseGuards(MateAuthGuard)
  getAllAppintments(@CurrentMate() mate: Mate) {
    return this.mateAppointementsService.findAll(mate, false);
  }

  @Get('completed')
  getAllCompletedAppinted(@CurrentMate() mate: Mate) {
    return this.mateAppointementsService.findAll(mate, true);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
  changeCompletion(@Param('id') id: number, @Body() body: ChangeCompletionDto) {
    return this.mateAppointementsService.changeCompletion(id, body.completed);
  }
}
