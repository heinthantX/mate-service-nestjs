import { Module } from '@nestjs/common';
import { MatesService } from './mates.service';
import { MatesController } from './mates.controller';

@Module({
  providers: [MatesService],
  controllers: [MatesController]
})
export class MatesModule {}
