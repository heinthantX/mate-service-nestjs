import { Module } from '@nestjs/common';
import { MatesService } from './mates.service';
import { MatesController } from './mates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from './mate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mate])],
  providers: [MatesService],
  controllers: [MatesController],
})
export class MatesModule {}
