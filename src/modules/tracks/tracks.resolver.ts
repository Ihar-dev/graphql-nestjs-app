import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { TracksService } from './tracks.service';
import { TrackCreateUpdateDTO } from './dto/track-create-update.dto';
import { TrackCreateUpdateInput } from './interfaces/track-input.interface';
import { DeleteResponseDTO } from '../shared/dto/delete-response.dto';
import { Track } from './dto/track.dto';
import { AlbumCreateUpdateDTO } from '../albums/dto/album-create-update.dto';
import { Album } from '../albums/dto/album.dto';
import { ArtistCreateUpdateDTO } from '../artists/dto/artist-create-update.dto';
import { Artist } from '../artists/dto/artist.dto';
import { BandCreateUpdateDTO } from '../bands/dto/band-create-update.dto';
import { Band } from '../bands/dto/band.dto';
import { Genre } from '../genres/dto/genre.dto';

//const CIRCLE_LIMIT = 10;

@Resolver(() => Track)
export class TracksResolver {
  private readonly defaultData: TrackCreateUpdateDTO;
  private readonly baseURL: string;
  private readonly albumDefaultData: AlbumCreateUpdateDTO;
  private readonly albumsBaseURL: string;
  public readonly artistDefaultData: ArtistCreateUpdateDTO;
  public readonly artistsBaseURL: string;
  public readonly bandDefaultData: BandCreateUpdateDTO;
  public readonly bandsBaseURL: string;
  public readonly genreDefaultData: Genre;
  public readonly genresBaseURL: string;

  constructor(private readonly tracksService: TracksService) {
    this.defaultData = {
      id: '',
      title: '',
      albumId: '',
      bandsIds: [],
      artistsIds: [],
      duration: 0,
      released: 0,
      genresIds: [],
    };
    this.baseURL = process.env.TRACKS_URL;
    this.albumDefaultData = {
      id: '',
      name: '',
      artistsIds: [],
      bandsIds: [],
      trackIds: [],
      genresIds: [],
    };
    this.albumsBaseURL = process.env.ALBUMS_URL;
    this.artistDefaultData = {
      id: '',
      firstName: '',
      secondName: '',
      country: '',
      bandsIds: [],
      instruments: [],
    };
    this.artistsBaseURL = process.env.ARTISTS_URL;
    this.bandDefaultData = {
      id: '',
      name: '',
      members: [],
      genresIds: [],
    };
    this.bandsBaseURL = process.env.BANDS_URL;
    this.genreDefaultData = {
      id: '',
      name: '',
      description: '',
      country: '',
      year: 0,
    };
    this.genresBaseURL = process.env.GENRES_URL;
  }

  @Query(() => Track)
  async track(@Args('id') id: string): Promise<TrackCreateUpdateDTO> {
    return this.tracksService.getById(
      id,
      this.defaultData,
      this.baseURL,
      //CIRCLE_LIMIT,
    );
  }

  @ResolveField(() => Album)
  async album(
    @Parent() track: TrackCreateUpdateDTO,
  ): Promise<AlbumCreateUpdateDTO> {
    const { albumId } = track;
    return this.tracksService.getById(
      albumId,
      this.albumDefaultData,
      this.albumsBaseURL,
    );
  }

  @ResolveField(() => [Artist])
  async artists(
    @Parent() track: TrackCreateUpdateDTO,
  ): Promise<ArtistCreateUpdateDTO[]> {
    const { artistsIds } = track;
    return Promise.all(
      artistsIds.map(id => {
        return this.tracksService.getById(
          id,
          this.artistDefaultData,
          this.artistsBaseURL,
        );
      }),
    );
  }

  @ResolveField(() => [Band])
  async bands(
    @Parent() track: TrackCreateUpdateDTO,
  ): Promise<BandCreateUpdateDTO[]> {
    const { bandsIds } = track;
    return await Promise.all(
      bandsIds.map(id => {
        return this.tracksService.getById(
          id,
          this.bandDefaultData,
          this.bandsBaseURL,
        );
      }),
    );
  }

  @ResolveField(() => [Genre])
  async genres(@Parent() track: TrackCreateUpdateDTO): Promise<Genre[]> {
    const { genresIds } = track;
    return Promise.all(
      genresIds.map(id => {
        return this.tracksService.getById(
          id,
          this.genreDefaultData,
          this.genresBaseURL,
        );
      }),
    );
  }

  @Query(() => [Track])
  async tracks(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
  ): Promise<TrackCreateUpdateDTO[]> {
    return this.tracksService.getAllTracks(
      this.defaultData,
      this.baseURL,
      limit,
      offset,
      //CIRCLE_LIMIT,
    );
  }

  @Mutation(() => TrackCreateUpdateDTO)
  async createTrack(
    @Args('title') title: string,
    @Args('albumId') albumId: string,
    @Args('artistsIds', { type: () => [String] }) artistsIds: string[],
    @Args('duration', { type: () => Number }) duration: number,
    @Args('released', { type: () => Number }) released: number,
    @Args('genresIds', { type: () => [String] }) genresIds: string[],
    @Args('bandsIds', { nullable: true, type: () => [String] })
    bandsIds?: string[],
  ) {
    const inputData: TrackCreateUpdateInput = {
      title,
      albumId,
      artistsIds,
      duration,
      released,
      genresIds,
    };
    if (bandsIds) inputData.bandsIds = bandsIds;
    return this.tracksService.create(inputData, this.defaultData, this.baseURL);
  }

  @Mutation(() => TrackCreateUpdateDTO)
  async updateTrack(
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('albumId') albumId: string,
    @Args('artistsIds', { type: () => [String] }) artistsIds: string[],
    @Args('duration', { type: () => Number }) duration: number,
    @Args('released', { type: () => Number }) released: number,
    @Args('genresIds', { type: () => [String] }) genresIds: string[],
    @Args('bandsIds', { nullable: true, type: () => [String] })
    bandsIds?: string[],
  ) {
    const inputData: TrackCreateUpdateInput = {
      title,
      albumId,
      artistsIds,
      duration,
      released,
      genresIds,
    };
    if (bandsIds) inputData.bandsIds = bandsIds;
    return this.tracksService.update(
      id,
      inputData,
      this.defaultData,
      this.baseURL,
    );
  }

  @Mutation(() => DeleteResponseDTO)
  async deleteTrack(@Args('id') id: string) {
    return this.tracksService.delete(id, this.baseURL);
  }
}
