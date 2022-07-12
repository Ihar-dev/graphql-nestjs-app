import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { FavouriteAddDTO } from './dto/favourite-add.dto';
import { FavouritesService } from './favourites.service';
import { FavouriteAddInput } from './interfaces/favourite-input.interface';
import { Favourites } from './dto/favourites.dto';
import { BandCreateUpdateDTO } from '../bands/dto/band-create-update.dto';
import { Band } from '../bands/dto/band.dto';
import { Genre } from '../genres/dto/genre.dto';
import { ArtistCreateUpdateDTO } from '../artists/dto/artist-create-update.dto';
import { Artist } from '../artists/dto/artist.dto';
import { TrackCreateUpdateDTO } from '../tracks/dto/track-create-update.dto';
import { Track } from '../tracks/dto/track.dto';

@Resolver(() => Favourites)
export class FavouritesResolver {
  private readonly defaultData: FavouriteAddDTO;
  private readonly baseURL: string;
  public readonly bandDefaultData: BandCreateUpdateDTO;
  public readonly BandsBaseURL: string;
  public readonly genreDefaultData: Genre;
  public readonly genresBaseURL: string;
  public readonly artistDefaultData: ArtistCreateUpdateDTO;
  public readonly artistsBaseURL: string;
  private readonly trackDefaultData: TrackCreateUpdateDTO;
  private readonly tracksBaseURL: string;

  constructor(private readonly favouritesService: FavouritesService) {
    this.defaultData = {
      id: '',
      userId: '',
    };
    this.baseURL = process.env.FAVORITES_URL;
    this.bandDefaultData = {
      id: '',
      name: '',
      members: [],
      genresIds: [],
    };
    this.BandsBaseURL = process.env.BANDS_URL;
    this.genreDefaultData = {
      id: '',
      name: '',
      description: '',
      country: '',
      year: 0,
    };
    this.genresBaseURL = process.env.GENRES_URL;
    this.artistDefaultData = {
      id: '',
      firstName: '',
      secondName: '',
      country: '',
      bandsIds: [],
      instruments: [],
    };
    this.artistsBaseURL = process.env.ARTISTS_URL;
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

  @Query(() => Favourites)
  async favourites(): Promise<FavouriteAddDTO> {
    return this.favouritesService.getFavourites(this.baseURL);
  }

  @ResolveField(() => [Band])
  async bands(
    @Parent() favourites: FavouriteAddDTO,
  ): Promise<BandCreateUpdateDTO[]> {
    const { bandsIds } = favourites;
    return await Promise.all(
      bandsIds.map(id => {
        return this.favouritesService.getById(
          id,
          this.bandDefaultData,
          this.BandsBaseURL,
        );
      }),
    );
  }

  @ResolveField(() => [Genre])
  async genres(@Parent() favourites: FavouriteAddDTO): Promise<Genre[]> {
    const { genresIds } = favourites;
    return await Promise.all(
      genresIds.map(id => {
        return this.favouritesService.getById(
          id,
          this.genreDefaultData,
          this.genresBaseURL,
        );
      }),
    );
  }

  @ResolveField(() => [Artist])
  async artists(
    @Parent() favourites: FavouriteAddDTO,
  ): Promise<ArtistCreateUpdateDTO[]> {
    const { artistsIds } = favourites;
    return await Promise.all(
      artistsIds.map(id => {
        return this.favouritesService.getById(
          id,
          this.artistDefaultData,
          this.artistsBaseURL,
        );
      }),
    );
  }

  @ResolveField(() => [Track])
  async tracks(
    @Parent() favourites: FavouriteAddDTO,
  ): Promise<TrackCreateUpdateDTO[]> {
    const { tracksIds } = favourites;
    return await Promise.all(
      tracksIds.map(id => {
        return this.favouritesService.getById(
          id,
          this.trackDefaultData,
          this.tracksBaseURL,
        );
      }),
    );
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

  @Mutation(() => FavouriteAddDTO)
  async addArtistToFavourites(@Args('id') id: string) {
    const inputData: FavouriteAddInput = {
      id,
      type: 'artists',
    };
    return this.favouritesService.add(
      inputData,
      this.defaultData,
      this.baseURL,
    );
  }

  @Mutation(() => FavouriteAddDTO)
  async addGenreToFavourites(@Args('id') id: string) {
    const inputData: FavouriteAddInput = {
      id,
      type: 'genres',
    };
    return this.favouritesService.add(
      inputData,
      this.defaultData,
      this.baseURL,
    );
  }
}
