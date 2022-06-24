import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { CreateMateDto } from './dtos/create-mate.dto';
import { MatesService } from './mates.service';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class MatesAuthService {
  constructor(private matesService: MatesService) {}

  async signUp(mateDto: CreateMateDto) {
    const mates = await this.matesService.find(mateDto.email);
    if (mates.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(mateDto.password, salt, 32)) as Buffer;

    const resultPassword = salt + '.' + hash.toString('hex');

    const result = { password: resultPassword };

    Object.assign(mateDto, result);

    const mate = await this.matesService.create(mateDto);

    return mate;
  }

  async signIn(email: string, password: string) {
    const [mate] = await this.matesService.find(email);

    if (!mate) {
      throw new NotFoundException('invaild email');
    }

    const [salt, storedHash] = mate.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('incorrect password');
    }

    return mate;
  }
}
