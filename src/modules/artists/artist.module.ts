import { Module } from '@nestjs/common';
import { ArtistsResolver } from './resolvers/artists.resolver';

@Module({
  providers: [ArtistsResolver],
})

export class ArtistsModule {}