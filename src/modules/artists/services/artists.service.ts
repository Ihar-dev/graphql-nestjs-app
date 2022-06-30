import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { CreateArtistDTO } from '../dto/create-artists.dto';

@Injectable()
export class ArtistsService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ARTISTS_URL,
    });
  }

  public async findAll(): Promise<CreateArtistDTO[] | []> {
    const defaultArtistsArray = [
      {
        firstName: 'null',
        secondName: 'null',
        middleName: 'null',
        birthDate: 'null',
        birthPlace: 'null',
        country: 'null',
        instruments: 'null',
      },
    ];

    const response = await this.client.get().catch((res) => {
      res.sendStatus(404);
    });
    return response?.data?.items && response.data.items.length > 0
      ? response.data.items
      : defaultArtistsArray;
  }
}
