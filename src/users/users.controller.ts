import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserAuthGuard } from '../guards/user-auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UsersAuthService } from './users-auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersAuthService: UsersAuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.usersAuthService.signUp(body);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signIn(@Body() body: Partial<CreateUserDto>, @Session() session: any) {
    const user = await this.usersAuthService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  @UseGuards(UserAuthGuard)
  signOut(@Session() session: any) {
    return (session.userId = null);
  }

  @Delete('delete')
  @UseGuards(UserAuthGuard)
  removeUser(@CurrentUser() user: User, @Session() session: any) {
    session.UserId = null;
    return this.usersService.remove(user.id);
  }

  @Get('whoami')
  @UseGuards(UserAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
  updateUser(@CurrentUser() user: User, @Body() body: UpdateUserDto) {
    return this.usersService.update(user.id, body);
  }
}
