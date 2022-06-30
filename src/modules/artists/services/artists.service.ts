import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { timeStamp } from 'console';

@Injectable()
export class ArtistsService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ARTISTS_URL,
    });
  }

  public async findAll() {
    const response = await this.client.get().catch((res) => {
      res.sendStatus(404);
    });
    return response.data.items;
  }
}
