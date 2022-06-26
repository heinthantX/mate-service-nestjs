import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';
import { CurrentMate } from '../mates/decorators/current-mate.decorator';
import { Mate } from '../mates/mate.entity';
import { SendMessageDto } from './dtos/send-message.dto';
import { MessagesService } from './messages.service';
import { User } from '../users/user.entity';
import { MatesService } from '../mates/mates.service';
import { MateAuthGuard } from '../guards/mate-auth.guard';
import { UserAuthGuard } from '../guards/user-auth.guard';

@Controller()
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService,
    private matesService: MatesService,
  ) {}

  @Post('mates/messages/send/:id')
  @UseGuards(MateAuthGuard)
  async sendMessageFromMate(
    @CurrentMate() mate: Mate,
    @Param('id') id: number,
    @Body() body: SendMessageDto,
  ) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.messagesService.sendMessage(body.content, 'mate', user, mate);
  }

  @Post('users/messages/send/:id')
  @UseGuards(UserAuthGuard)
  async sendMessageFromUser(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() body: SendMessageDto,
  ) {
    const mate = await this.matesService.findOne(id);

    if (!mate) {
      throw new NotFoundException('mate not found');
    }

    return this.messagesService.sendMessage(body.content, 'user', user, mate);
  }

  @Get('mates/messages/:id')
  @UseGuards(MateAuthGuard)
  async getAllMessageForMate(
    @Param('id') id: number,
    @CurrentMate() mate: Mate,
  ) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.messagesService.getAllMessages(user, mate, 'user');
  }

  @Get('users/messages/:id')
  @UseGuards(UserAuthGuard)
  async getAllMessageForUser(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ) {
    const mate = await this.matesService.findOne(id);
    if (!mate) {
      throw new NotFoundException('user not found');
    }
    return this.messagesService.getAllMessages(user, mate, 'mate');
  }
}
