import { Module } from '@nestjs/common';
import { MatesService } from './mates.service';
import { MatesController } from './mates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from './mate.entity';
import { MatesAuthService } from './mates-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mate])],
  providers: [MatesService, MatesAuthService],
  controllers: [MatesController],
})
export class MatesModule {}
