import { Resolver, Query } from '@nestjs/graphql';

import { ArtistsService } from './artists.service';
import { CreateArtistDTO } from './dto/create-artists.dto';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Query(() => [CreateArtistDTO], { nullable: true })
  async artists() {
    return this.artistsService.findAll();
  }
}
