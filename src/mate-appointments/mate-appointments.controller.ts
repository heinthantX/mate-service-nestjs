import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { MateAuthGuard } from '../guards/mate-auth.guard';
import { UserAuthGuard } from '../guards/user-auth.guard';
import { CurrentMate } from '../mates/decorators/current-mate.decorator';
import { Mate } from '../mates/mate.entity';
import { ChangeCompletionDto } from './dtos/change-completion.dto';
import { MateAppointmentsService } from './mate-appointments.service';
import { GetAppointmentsDto } from './dtos/get-appoointments.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('appointments')
export class MateAppointmentsController {
  constructor(private mateAppointementsService: MateAppointmentsService) {}

  @Get('mates/appointments')
  @UseGuards(MateAuthGuard)
  getAllAppintments(
    @CurrentMate() mate: Mate,
    @Query() query: GetAppointmentsDto,
  ) {
    return this.mateAppointementsService.findAll(mate, query.completed);
  }

  @Patch('mates/appointments/:id')
  @UseGuards(UserAuthGuard)
  changeCompletion(
    @Param('id') id: number,
    @CurrentUser() user: User,
    @Body() body: ChangeCompletionDto,
  ) {
    return this.mateAppointementsService.changeCompletion(
      id,
      user,
      body.completed,
    );
  }

  @Get('users/appointments')
  @UseGuards(UserAuthGuard)
  getAppintmentsForUser(
    @CurrentUser() user: User,
    @Query() query: GetAppointmentsDto,
  ) {
    return this.mateAppointementsService.findAllForUser(user, query.completed);
  }
}
