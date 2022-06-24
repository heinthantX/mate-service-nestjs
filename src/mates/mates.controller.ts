import { Body, Controller, Post, Session } from '@nestjs/common';
import { CreateMateDto } from './dtos/create-mate.dto';
import { MatesAuthService } from './mates-auth.service';
import { MatesService } from './mates.service';

@Controller('mates')
export class MatesController {
  constructor(
    private mateService: MatesService,
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
}
