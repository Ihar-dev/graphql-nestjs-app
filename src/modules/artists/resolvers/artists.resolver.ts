import { Resolver, Query } from '@nestjs/graphql';

import { ArtistsService } from '../services/artists.service';
import { CreateArtistDTO } from '../dto/create-artists.dto';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CreateArtistDTO], { nullable: true })
  async artists() {
    return this.artistsService.findAll();
  }
}
