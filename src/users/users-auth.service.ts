import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class UsersAuthService {
  constructor(private usersService: UsersService) {}

  async signUp(userDto: CreateUserDto) {
    const users = await this.usersService.find(userDto.email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(userDto.password, salt, 32)) as Buffer;

    const resultPassword = salt + '.' + hash.toString('hex');

    const result = { password: resultPassword };

    Object.assign(userDto, result);

    const user = await this.usersService.create(userDto);

    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('invaild email');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('incorrect password');
    }

    return user;
  }
}
