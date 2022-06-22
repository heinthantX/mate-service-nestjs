import { Module } from '@nestjs/common';
import { MatePriceService } from './mate-price.service';
import { MatePriceController } from './mate-price.controller';

@Module({
  providers: [MatePriceService],
  controllers: [MatePriceController]
})
export class MatePriceModule {}
