import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MateAuthGuard } from 'src/guards/mate-auth.guard';
import { UserAuthGuard } from 'src/guards/user-auth.guard';
import { CurrentMate } from 'src/mates/decorators/current-mate.decorator';
import { Mate } from 'src/mates/mate.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AcceptRequestDto } from './dtos/accept-request.dto';
import { CreateRequestDto } from './dtos/create-request.dto';
import { MateRequestsService } from './mate-requests.service';

@Controller('mates/request')
export class MateRequestsController {
  constructor(private mateRequestService: MateRequestsService) {}

  @Post('/:id')
  @UseGuards(UserAuthGuard)
  createRequest(
    @Body() body: CreateRequestDto,
    @CurrentUser() user: User,
    @Param('id') id: number,
  ) {
    return this.mateRequestService.createRequest(body, user, id);
  }

  @Patch('accept/:id')
  @UseGuards(MateAuthGuard)
  acceptRequest(
    @Param('id') id: number,
    @CurrentMate() mate: Mate,
    @Body() body: AcceptRequestDto,
  ) {
    return this.mateRequestService.acceptRequest(id, mate, body.accepted);
  }

  @Get()
  @UseGuards(MateAuthGuard)
  getAllRequest(@CurrentMate() mate: Mate) {
    return this.mateRequestService.findAll(mate);
  }
}
