import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
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

  @UseGuards(AuthGuard)
  @Post('signout')
  signOut(@Session() session: any) {
    return (session.userId = null);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  removeUser(@CurrentUser() id: number) {
    return this.usersService.remove(id);
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
