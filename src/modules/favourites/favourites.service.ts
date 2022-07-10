import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { SharedService } from '../shared/shared.service';
import { FavouriteAddInput } from './interfaces/favourite-input.interface';
import { FavouriteAddDTO } from './dto/favourite-add.dto';

@Injectable()
export class FavouritesService extends SharedService {
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
}
