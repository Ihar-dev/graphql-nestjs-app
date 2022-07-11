import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { SharedService } from '../shared/shared.service';
import { FavouriteAddInput } from './interfaces/favourite-input.interface';
import { FavouriteAddDTO } from './dto/favourite-add.dto';
import { Favourites } from './dto/favourites.dto';
import { ArtistCreateUpdateDTO } from '../artists/dto/artist-create-update.dto';
import { TrackCreateUpdateDTO } from '../tracks/dto/track-create-update.dto';

const CIRCLE_LIMIT = 10;

@Injectable()
export class FavouritesService extends SharedService {
  private readonly FavouritesDefaultData: Favourites;
  private readonly ArtistDefaultData: ArtistCreateUpdateDTO;
  private readonly ArtistsBaseURL: string;
  private readonly trackDefaultData: TrackCreateUpdateDTO;
  private readonly tracksBaseURL: string;

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
    this.ArtistDefaultData = {
      id: '',
      firstName: '',
      secondName: '',
      country: '',
      bandsIds: [],
      instruments: [],
    };
    this.ArtistsBaseURL = process.env.ARTISTS_URL;
    this.trackDefaultData = {
      id: '',
      title: '',
      albumId: '',
      bandsIds: [],
      artistsIds: [],
      duration: 0,
      released: 0,
      genresIds: [],
    };
    this.tracksBaseURL = process.env.TRACKS_URL;
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

  /* public async getFavourites(baseURL: string): Promise<Favourites> {
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
    if (response) {
      response.data.id = response.data._id;
      response.data.bands = await Promise.all(
        response.data.bandsIds.map(id => super.getBandByIdForFavourites(id)),
      );
      response.data.genres = await Promise.all(
        response.data.genresIds.map(id => super.getGenre(id)),
      );
      response.data.artists = await Promise.all(
        response.data.artistsIds.map(id =>
          super.getArtistById(id, this.ArtistDefaultData, this.ArtistsBaseURL),
        ),
      );
      response.data.tracks = await Promise.all(
        response.data.tracksIds.map(id =>
          super.getTrackById(
            id,
            this.trackDefaultData,
            this.tracksBaseURL,
            CIRCLE_LIMIT,
          ),
        ),
      );
    }
    return response
      ? response.data
      : super.getCaughtErrorData(this.FavouritesDefaultData);
  } */
}
