import { Module } from '@nestjs/common';
import { GenresResolver } from './genres.resolver';
import { GenresService } from './genres.service';
import { SharedService } from '../shared/shared.service';

@Module({
  providers: [GenresResolver, GenresService, SharedService],
})
export class GenresModule {}
