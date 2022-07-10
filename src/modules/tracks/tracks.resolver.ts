import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TracksService } from './tracks.service';
import { TrackCreateUpdateDTO } from './dto/track-create-update.dto';
import { TrackCreateUpdateInput } from './interfaces/track-input.interface';
import { DeleteResponseDTO } from '../shared/dto/delete-response.dto';
import { Track } from './dto/track.dto';

const CIRCLE_LIMIT = 10;

@Resolver('Tracks')
export class TracksResolver {
  private readonly defaultData: TrackCreateUpdateDTO;
  private readonly baseURL: string;

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
  }

  @Query(() => Track)
  async track(@Args('id') id: string) {
    return this.tracksService.getTrackById(
      id,
      this.defaultData,
      this.baseURL,
      CIRCLE_LIMIT,
    );
  }

  @Query(() => [Track])
  async tracks(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.tracksService.getAllTracks(
      this.defaultData,
      this.baseURL,
      limit,
      offset,
      CIRCLE_LIMIT,
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
