import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { AlbumsService } from './albums.service';
import { AlbumCreateUpdateDTO } from './dto/album-create-update.dto';
import { AlbumCreateUpdateInput } from './interfaces/album-input.interface';
import { DeleteResponseDTO } from '../shared/dto/delete-response.dto';
import { Album } from './dto/album.dto';
import { BandCreateUpdateDTO } from '../bands/dto/band-create-update.dto';
import { Band } from '../bands/dto/band.dto';
import { ArtistCreateUpdateDTO } from '../artists/dto/artist-create-update.dto';
import { Artist } from '../artists/dto/artist.dto';
import { Genre } from '../genres/dto/genre.dto';
import { TrackCreateUpdateDTO } from '../tracks/dto/track-create-update.dto';
import { Track } from '../tracks/dto/track.dto';

//const CIRCLE_LIMIT = 10;

@Resolver(() => Album)
export class AlbumsResolver {
  private readonly defaultData: AlbumCreateUpdateDTO;
  private readonly baseURL: string;
  public readonly bandDefaultData: BandCreateUpdateDTO;
  public readonly BandsBaseURL: string;
  public readonly artistDefaultData: ArtistCreateUpdateDTO;
  public readonly artistsBaseURL: string;
  public readonly genreDefaultData: Genre;
  public readonly genresBaseURL: string;
  private readonly trackDefaultData: TrackCreateUpdateDTO;
  private readonly tracksBaseURL: string;

  constructor(private readonly albumsService: AlbumsService) {
    this.defaultData = {
      id: '',
      name: '',
      artistsIds: [],
      bandsIds: [],
      trackIds: [],
      genresIds: [],
    };
    this.baseURL = process.env.ALBUMS_URL;
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
    this.bandDefaultData = {
      id: '',
      name: '',
      members: [],
      genresIds: [],
    };
    this.BandsBaseURL = process.env.BANDS_URL;
    this.artistDefaultData = {
      id: '',
      firstName: '',
      secondName: '',
      country: '',
      bandsIds: [],
      instruments: [],
    };
    this.artistsBaseURL = process.env.ARTISTS_URL;
    this.genreDefaultData = {
      id: '',
      name: '',
      description: '',
      country: '',
      year: 0,
    };
    this.genresBaseURL = process.env.GENRES_URL;
  }

  @Query(() => Album)
  async album(@Args('id') id: string): Promise<AlbumCreateUpdateDTO> {
    return this.albumsService.getById(
      id,
      this.defaultData,
      this.baseURL,
      //CIRCLE_LIMIT,
    );
  }

  @ResolveField(() => [Genre])
  async genres(@Parent() album: AlbumCreateUpdateDTO): Promise<Genre[]> {
    const { genresIds } = album;
    return await Promise.all(
      genresIds.map(id => {
        return this.albumsService.getById(
          id,
          this.genreDefaultData,
          this.genresBaseURL,
        );
      }),
    );
  }

  @ResolveField(() => [Artist])
  async artists(
    @Parent() album: AlbumCreateUpdateDTO,
  ): Promise<ArtistCreateUpdateDTO[]> {
    const { artistsIds } = album;
    return await Promise.all(
      artistsIds.map(id => {
        return this.albumsService.getById(
          id,
          this.artistDefaultData,
          this.artistsBaseURL,
        );
      }),
    );
  }

  @ResolveField(() => [Track])
  async tracks(
    @Parent() album: AlbumCreateUpdateDTO,
  ): Promise<TrackCreateUpdateDTO[]> {
    const { trackIds } = album;
    return await Promise.all(
      trackIds.map(id => {
        return this.albumsService.getById(
          id,
          this.trackDefaultData,
          this.tracksBaseURL,
        );
      }),
    );
  }

  @ResolveField(() => [Band])
  async bands(
    @Parent() album: AlbumCreateUpdateDTO,
  ): Promise<BandCreateUpdateDTO[]> {
    const { bandsIds } = album;
    return await Promise.all(
      bandsIds.map(id => {
        return this.albumsService.getById(
          id,
          this.bandDefaultData,
          this.BandsBaseURL,
        );
      }),
    );
  }

  @Query(() => [Album])
  async albums(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.albumsService.getAllAlbums(
      this.defaultData,
      this.baseURL,
      limit,
      offset,
      //CIRCLE_LIMIT,
    );
  }

  @Mutation(() => AlbumCreateUpdateDTO)
  async createAlbum(
    @Args('name') name: string,
    @Args('released', { nullable: true }) released?: number,
    @Args('artistsIds', { nullable: true, type: () => [String] })
    artistsIds?: string[],
    @Args('bandsIds', { nullable: true, type: () => [String] })
    bandsIds?: string[],
    @Args('trackIds', { nullable: true, type: () => [String] })
    trackIds?: string[],
    @Args('genresIds', { nullable: true, type: () => [String] })
    genresIds?: string[],
    @Args('image', { nullable: true }) image?: string,
  ) {
    const inputData: AlbumCreateUpdateInput = {
      name,
    };
    if (released) inputData.released = released;
    if (artistsIds) inputData.artistsIds = artistsIds;
    if (bandsIds) inputData.bandsIds = bandsIds;
    if (trackIds) inputData.trackIds = trackIds;
    if (genresIds) inputData.genresIds = genresIds;
    if (image) inputData.image = image;
    return this.albumsService.create(inputData, this.defaultData, this.baseURL);
  }

  @Mutation(() => AlbumCreateUpdateDTO)
  async updateAlbum(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('released', { nullable: true }) released?: number,
    @Args('artistsIds', { nullable: true, type: () => [String] })
    artistsIds?: string[],
    @Args('bandsIds', { nullable: true, type: () => [String] })
    bandsIds?: string[],
    @Args('trackIds', { nullable: true, type: () => [String] })
    trackIds?: string[],
    @Args('genresIds', { nullable: true, type: () => [String] })
    genresIds?: string[],
    @Args('image', { nullable: true }) image?: string,
  ) {
    const inputData: AlbumCreateUpdateInput = {
      name,
    };
    if (released) inputData.released = released;
    if (artistsIds) inputData.artistsIds = artistsIds;
    if (bandsIds) inputData.bandsIds = bandsIds;
    if (trackIds) inputData.trackIds = trackIds;
    if (genresIds) inputData.genresIds = genresIds;
    if (image) inputData.image = image;
    return this.albumsService.update(
      id,
      inputData,
      this.defaultData,
      this.baseURL,
    );
  }

  @Mutation(() => DeleteResponseDTO)
  async deleteAlbum(@Args('id') id: string) {
    return this.albumsService.delete(id, this.baseURL);
  }
}
