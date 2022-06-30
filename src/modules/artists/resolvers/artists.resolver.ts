import { Resolver, Query } from '@nestjs/graphql';
import { ArtistsService } from '../services/artists.service';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => String)
  async artists() {
    return this.artistsService.findAll();
  }
}
