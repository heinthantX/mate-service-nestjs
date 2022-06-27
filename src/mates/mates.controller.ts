import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query,
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
import { ChangeMateActiveStatusDto } from './dtos/change-mate-active-status.dto';
import { FindMateByUserDto } from './dtos/find-mate-by-user.dto';

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
  whoAmI(@CurrentMate() mate: Mate) {
    if (!mate) {
      throw new NotFoundException("you aren't signed in");
    }
    return mate;
  }

  @Patch('update')
  @UseGuards(MateAuthGuard)
  updateMate(@CurrentMate() mate: Mate, @Body() body: UpdateMateDto) {
    return this.matesService.update(mate.id, body);
  }

  @Patch('active-status')
  @UseGuards(MateAuthGuard)
  changeOfflineMate(
    @CurrentMate() mate: Mate,
    @Body() body: ChangeMateActiveStatusDto,
  ) {
    return this.matesService.update(mate.id, body);
  }

  @Get()
  findMate(@Query() query: FindMateByUserDto) {
    return this.matesService.findMateByUser(query);
  }
}
