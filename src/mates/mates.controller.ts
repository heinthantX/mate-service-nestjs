import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateMateDto } from './dtos/create-mate.dto';
import { MatesAuthService } from './mates-auth.service';
import { MatesService } from './mates.service';
import { MateAuthGuard } from '../guards/mate-auth.guard';
import { CurrentMate } from './decorators/current-mate.decorator';
import { Mate } from './mate.entity';
import { UpdateMateDto } from './dtos/update-mate.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { MateDto } from './dtos/mate.dto';

@Controller('mates')
@Serialize(MateDto)
export class MatesController {
  constructor(
    private matesService: MatesService,
    private matesAuthService: MatesAuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: CreateMateDto, @Session() session: any) {
    const mate = await this.matesAuthService.signUp(body);
    session.mateId = mate.id;
    return mate;
  }

  @Post('signin')
  async signIn(@Body() body: Partial<CreateMateDto>, @Session() session: any) {
    const mate = await this.matesAuthService.signIn(body.email, body.password);
    session.mateId = mate.id;
    return mate;
  }

  @Post('signout')
  signout(@Session() session: any) {
    return (session.mateId = null);
  }

  @Delete('delete')
  @UseGuards(MateAuthGuard)
  removeUser(@CurrentMate() mate: Mate, @Session() session: any) {
    session.UserId = null;
    return this.matesService.remove(mate.id);
  }

  @Get('whoami')
  @UseGuards(MateAuthGuard)
  whoAmI(@CurrentMate() mate: Mate) {
    return mate;
  }

  @Patch('update')
  @UseGuards(MateAuthGuard)
  updateMate(@CurrentMate() mate: Mate, @Body() body: UpdateMateDto) {
    return this.matesService.update(mate.id, body);
  }
}
