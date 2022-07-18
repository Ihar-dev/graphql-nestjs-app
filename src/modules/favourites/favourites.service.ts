import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { SharedService } from '../shared/shared.service';
import { FavouriteAddInput } from './interfaces/favourite-input.interface';
import { FavouriteAddDTO } from './dto/favourite-add.dto';
import { Favourites } from './dto/favourites.dto';

@Injectable()
export class FavouritesService extends SharedService {
  private readonly FavouritesDefaultData: Favourites;

  constructor() {
    super();
    this.FavouritesDefaultData = {
      id: '',
      userId: '',
      bands: [],
      genres: [],
      artists: [],
      tracks: [],
    };
  }

  public async add(
    inputDTO: FavouriteAddInput,
    defaultData: FavouriteAddDTO,
    baseURL: string,
  ): Promise<FavouriteAddDTO> {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    };
    const response = await axios
      .create({
        baseURL,
      })
      .put('/add', inputDTO, config)
      .catch(err => super.setCaughtErrorMessage(err.name, err.message));
    if (response) response.data.id = response.data._id;
    return response ? response.data : super.getCaughtErrorData(defaultData);
  }

  public async getFavourites(baseURL: string): Promise<FavouriteAddDTO> {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    };
    const response = await axios
      .create({
        baseURL,
      })
      .get('', config)
      .catch(err => super.setCaughtErrorMessage(err.name, err.message));
    if (response) response.data.id = response.data._id;
    return response
      ? response.data
      : super.getCaughtErrorData(this.FavouritesDefaultData);
  }
}
