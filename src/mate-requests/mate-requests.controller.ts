import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MateAuthGuard } from '../guards/mate-auth.guard';
import { UserAuthGuard } from '../guards/user-auth.guard';
import { CurrentMate } from '../mates/decorators/current-mate.decorator';
import { Mate } from '../mates/mate.entity';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { AcceptRequestDto } from './dtos/accept-request.dto';
import { CreateRequestDto } from './dtos/create-request.dto';
import { MateRequestsService } from './mate-requests.service';

@Controller()
@ApiTags('requests')
export class MateRequestsController {
  constructor(private mateRequestService: MateRequestsService) {}

  @Post('mates/requests/:id')
  @UseGuards(UserAuthGuard)
  createRequest(
    @Body() body: CreateRequestDto,
    @CurrentUser() user: User,
    @Param('id') id: number,
  ) {
    return this.mateRequestService.createRequest(body, user, id);
  }

  @Patch('mates/requests/accept/:id')
  @UseGuards(MateAuthGuard)
  acceptRequest(
    @Param('id') id: number,
    @CurrentMate() mate: Mate,
    @Body() body: AcceptRequestDto,
  ) {
    return this.mateRequestService.acceptRequest(id, mate, body.accepted);
  }

  @Get('mates/requests')
  @UseGuards(MateAuthGuard)
  getAllRequest(@CurrentMate() mate: Mate) {
    return this.mateRequestService.findAll(mate);
  }

  @Get('users/requests')
  getRequestsByUser(@CurrentUser() user: User) {
    return this.mateRequestService.findAllForUser(user);
  }
}
