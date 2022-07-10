import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AlbumsService } from './albums.service';
import { AlbumCreateUpdateDTO } from './dto/album-create-update.dto';
import { AlbumCreateUpdateInput } from './interfaces/album-input.interface';

@Resolver('Albums')
export class AlbumsResolver {
  private readonly defaultData: AlbumCreateUpdateDTO;
  private readonly baseURL: string;

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
}
