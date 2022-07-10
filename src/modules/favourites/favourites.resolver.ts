import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { FavouriteAddDTO } from './dto/favourite-add.dto';
import { FavouritesService } from './favourites.service';
import { FavouriteAddInput } from './interfaces/favourite-input.interface';

@Resolver()
export class FavouritesResolver {
  private readonly defaultData: FavouriteAddDTO;
  private readonly baseURL: string;

  constructor(private readonly favouritesService: FavouritesService) {
    this.defaultData = {
      id: '',
      userId: '',
    };
    this.baseURL = process.env.FAVORITES_URL;
  }

  @Mutation(() => FavouriteAddDTO)
  async addTrackToFavourites(@Args('id') id: string) {
    const inputData: FavouriteAddInput = {
      id,
      type: 'tracks',
    };
    return this.favouritesService.add(
      inputData,
      this.defaultData,
      this.baseURL,
    );
  }

  @Mutation(() => FavouriteAddDTO)
  async addBandToFavourites(@Args('id') id: string) {
    const inputData: FavouriteAddInput = {
      id,
      type: 'bands',
    };
    return this.favouritesService.add(
      inputData,
      this.defaultData,
      this.baseURL,
    );
  }
}
