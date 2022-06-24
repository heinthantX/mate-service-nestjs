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
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
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
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signIn(@Body() body: Partial<CreateUserDto>, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  signOut(@Session() session: any) {
    return (session.userId = null);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  removeUser(@CurrentUser() user: User, @Session() session: any) {
    session.UserId = null;
    return this.usersService.remove(user.id);
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateUser(@CurrentUser() user: User, @Body() body: UpdateUserDto) {
    return this.usersService.update(user.id, body);
  }
}
