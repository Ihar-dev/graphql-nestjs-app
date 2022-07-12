import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GenresService } from './genres.service';
import { Genre } from './dto/genre.dto';
import { DeleteResponseDTO } from '../shared/dto/delete-response.dto';

@Resolver(() => Genre)
export class GenresResolver {
  private readonly defaultData: Genre;
  private readonly baseURL: string;

  constructor(private readonly genresService: GenresService) {
    this.defaultData = {
      id: '',
      name: '',
      description: '',
      country: '',
      year: 0,
    };
    this.baseURL = process.env.GENRES_URL;
  }

  @Query(() => Genre)
  async genre(@Args('id') id: string): Promise<Genre> {
    return this.genresService.getById(id, this.defaultData, this.baseURL);
  }

  @Query(() => [Genre])
  async genres(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
  ): Promise<Genre[]> {
    return this.genresService.getAll(
      this.defaultData,
      this.baseURL,
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
  ): Promise<Genre> {
    return this.genresService.create(
      { name, description, country, year },
      this.defaultData,
      this.baseURL,
    );
  }

  @Mutation(() => Genre)
  async updateGenre(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('country') country: string,
    @Args('year') year: number,
  ): Promise<Genre> {
    return this.genresService.update(
      id,
      { name, description, country, year },
      this.defaultData,
      this.baseURL,
    );
  }

  @Mutation(() => DeleteResponseDTO)
  async deleteGenre(@Args('id') id: string): Promise<DeleteResponseDTO> {
    return this.genresService.delete(id, this.baseURL);
  }
}
