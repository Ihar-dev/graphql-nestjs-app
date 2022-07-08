import { Injectable } from '@nestjs/common';

import { SharedService } from '../shared/shared.service';
import { BandCreateUpdateDTO } from './dto/band-create-update.dto';
import { Band } from './dto/band.dto';
import { Genre } from '../genres/dto/genre.dto';
import { Member } from './dto/member.dto';

@Injectable()
export class BandsService extends SharedService {
  private readonly defaultData: Band;
  private readonly genreDefaultData: Genre;
  private readonly genreBaseURL: string;

  constructor() {
    super();
    this.defaultData = {
      id: '',
      name: '',
      members: [],
      genres: [],
    };
    this.genreDefaultData = {
      id: '',
      name: '',
      description: '',
      country: '',
      year: 0,
    };
    this.genreBaseURL = process.env.GENRES_URL;
  }

  public async getBandById(
    id: string,
    defaultData: BandCreateUpdateDTO,
    baseURL: string,
  ): Promise<Band> {
    const initialBand: BandCreateUpdateDTO = await super.getById(
      id,
      defaultData,
      baseURL,
    );

    const band = this.defaultData;

    if (initialBand.id) band.id = initialBand.id;
    if (initialBand.name) band.name = initialBand.name;
    if (initialBand.origin) band.origin = initialBand.origin;
    else band.origin = null;
    if (initialBand.members) band.members = initialBand.members;
    if (initialBand.website) band.website = initialBand.website;
    else band.website = null;
    band.genres = [];

    const promiseArray = [];

    initialBand.genresIds.forEach(async id => {
      promiseArray.push(
        new Promise(async resolve => {
          const genre: Genre = await super.getById(
            id,
            this.genreDefaultData,
            this.genreBaseURL,
          );
          band.genres.push(genre);
          resolve(null);
        }),
      );
    });

    await Promise.all([]);
    return band;
  }

  public async getAllBands(
    defaultData: BandCreateUpdateDTO,
    baseURL: string,
    limit: number,
    offset: number,
  ): Promise<Band[]> {
    const initialBands = await super.getAll(
      defaultData,
      baseURL,
      limit,
      offset,
    );

    const bands: Band[] = [
      {
        id: '',
        name: '',
        origin: '',
        members: [],
        website: '',
        genres: [],
      },
    ];

    await Promise.all(
      initialBands.map(async (initialBand, index) => {
        return new Promise(async resolve => {
          const band = {
            id: '',
            name: '',
            origin: '',
            members: [],
            website: '',
            genres: [],
          };

          if (initialBand.id) band.id = initialBand.id;
          if (initialBand.name) band.name = initialBand.name;
          if (initialBand.origin) band.origin = initialBand.origin;
          else band.origin = null;
          if (initialBand.members) band.members = initialBand.members;
          if (initialBand.website) band.website = initialBand.website;
          else band.website = null;
          band.genres = [];

          await Promise.all(
            initialBand.genresIds.map(id => {
              return new Promise(async resolve => {
                const genre: Genre = await super.getById(
                  id,
                  this.genreDefaultData,
                  this.genreBaseURL,
                );
                band.genres.push(genre);
                resolve(null);
              });
            }),
          );
          bands[index] = band;
          resolve(null);
        });
      }),
    );
    return bands;
  }
}
