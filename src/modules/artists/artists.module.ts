import { Module } from '@nestjs/common';
import { ArtistsResolver } from './resolvers/artists.resolver';
import { ArtistsService } from './services/artists.service';

@Module({
  providers: [ArtistsResolver, ArtistsService],
})
export class ArtistsModule {}
