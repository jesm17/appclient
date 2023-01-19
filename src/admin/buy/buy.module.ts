import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Buy, buySchema } from './entities/buy.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Buy.name, schema: buySchema }])],
  controllers: [BuyController],
  providers: [BuyService],
})
export class BuyModule {}
