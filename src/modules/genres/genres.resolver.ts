import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GenresService } from './genres.service';
import { Genre } from './dto/genre.dto';

@Resolver()
export class GenresResolver {
  private readonly defaultData: Genre;

  constructor(private readonly genresService: GenresService) {
    this.defaultData = {
      id: '',
      name: '',
      description: '',
      country: '',
      year: 0,
    };
  }

  @Query(() => Genre)
  async genre(@Args('id') id: string) {
    return this.genresService.getById(
      id,
      this.defaultData,
      process.env.GENRES_URL,
    );
  }

  @Query(() => [Genre])
  async genres(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.genresService.getAll(
      [this.defaultData],
      process.env.GENRES_URL,
      limit,
      offset,
    );
  }

  @Mutation(() => Genre)
  async createGenre(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('country') country: string,
    @Args('year') year: number,
  ) {
    return this.genresService.create(
      { name, description, country, year },
      this.defaultData,
      process.env.GENRES_URL,
    );
  }
}
