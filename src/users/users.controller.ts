import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Session,
  UseGuards,
  NotFoundException,
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
import { ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from './dtos/sign-in-user.dto';

@ApiTags('users')
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
  async signIn(@Body() body: SignInUserDto, @Session() session: any) {
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
  whoAmI(@CurrentUser() user: User) {
    if (!user) {
      throw new NotFoundException("you aren't signed in");
    }
    return user;
  }

  @Patch('update')
  @UseGuards(UserAuthGuard)
  updateUser(@CurrentUser() user: User, @Body() body: UpdateUserDto) {
    return this.usersService.update(user.id, body);
  }
}
