import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(userDto: CreateUserDto) {
    const users = await this.userService.find(userDto.email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(userDto.password, salt, 32)) as Buffer;

    const resultPassword = salt + '.' + hash.toString('hex');

    const resultObject = { password: resultPassword };

    let result = Object.assign(userDto, resultObject);

    const user = await this.userService.create(result);

    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);

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
