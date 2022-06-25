import { Module } from '@nestjs/common';
import { MatePriceService } from './mate-price.service';
import { MatePriceController } from './mate-price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatePrice } from './mate-price.entity';
import { MatesModule } from '../mates/mates.module';

@Module({
  imports: [TypeOrmModule.forFeature([MatePrice]), MatesModule],
  providers: [MatePriceService],
  controllers: [MatePriceController],
})
export class MatePriceModule {}
