import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GenresService } from './genres.service';
import { Genre } from './dto/genre.dto';

@Resolver()
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Mutation(() => Genre)
  async createGenre(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('country') country: string,
    @Args('year') year: number,
  ) {
    const defaultData: Genre = {
      id: '',
      name: '',
      description: '',
      country: '',
      year: 0,
    };
    return this.genresService.create(
      { name, description, country, year },
      defaultData,
    );
  }
}
