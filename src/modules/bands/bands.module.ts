import { Module } from '@nestjs/common';
import { BandsResolver } from './bands.resolver';
import { BandsService } from './bands.service';

@Module({
  providers: [BandsResolver, BandsService],
})
export class BandsModule {}
