import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { BandsService } from './bands.service';
import { BandCreateUpdateDTO } from './dto/band-create-update.dto';
import { BandCreateUpdateInput } from './interfaces/band-input.interface';
import { MemberInputDTO } from './dto/member-input.dto';
import { DeleteResponseDTO } from '../shared/dto/delete-response.dto';
import { Band } from './dto/band.dto';
import { Genre } from '../genres/dto/genre.dto';

@Resolver(() => Band)
export class BandsResolver {
  private readonly defaultData: BandCreateUpdateDTO;
  private readonly baseURL: string;
  public readonly genreDefaultData: Genre;
  public readonly genresBaseURL: string;

  constructor(private readonly bandsService: BandsService) {
    this.defaultData = {
      id: '',
      name: '',
      members: [],
      genresIds: [],
    };
    this.baseURL = process.env.BANDS_URL;
    this.genreDefaultData = {
      id: '',
      name: '',
      description: '',
      country: '',
      year: 0,
    };
    this.genresBaseURL = process.env.GENRES_URL;
  }

  @Query(() => Band)
  async band(@Args('id') id: string): Promise<BandCreateUpdateDTO> {
    return this.bandsService.getById(id, this.defaultData, this.baseURL);
  }

  @ResolveField(() => [Genre])
  async genres(@Parent() band: BandCreateUpdateDTO): Promise<Genre[]> {
    const { genresIds } = band;
    return await Promise.all(
      genresIds.map(id => {
        return this.bandsService.getById(
          id,
          this.genreDefaultData,
          this.genresBaseURL,
        );
      }),
    );
  }

  @Query(() => [Band])
  async bands(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
  ): Promise<BandCreateUpdateDTO[]> {
    return this.bandsService.getAllBands(
      this.defaultData,
      this.baseURL,
      limit,
      offset,
    );
  }

  @Mutation(() => BandCreateUpdateDTO)
  async createBand(
    @Args('name') name: string,
    @Args('origin', { nullable: true }) origin?: string,
    @Args('members', { nullable: true, type: () => [MemberInputDTO] })
    members?: MemberInputDTO[],
    @Args('website', { nullable: true }) website?: string,
    @Args('genresIds', { nullable: true, type: () => [String] })
    genresIds?: string[],
  ) {
    const inputData: BandCreateUpdateInput = { name };
    if (origin) inputData.origin = origin;
    if (members) inputData.members = members;
    if (website) inputData.website = website;
    if (genresIds) inputData.genresIds = genresIds;
    return this.bandsService.create(inputData, this.defaultData, this.baseURL);
  }

  @Mutation(() => BandCreateUpdateDTO)
  async updateBand(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('origin', { nullable: true }) origin?: string,
    @Args('members', { nullable: true, type: () => [MemberInputDTO] })
    members?: MemberInputDTO[],
    @Args('website', { nullable: true }) website?: string,
    @Args('genresIds', { nullable: true, type: () => [String] })
    genresIds?: string[],
  ) {
    const inputData: BandCreateUpdateInput = { name };
    if (origin) inputData.origin = origin;
    if (members) inputData.members = members;
    if (website) inputData.website = website;
    if (genresIds) inputData.genresIds = genresIds;
    return this.bandsService.update(
      id,
      inputData,
      this.defaultData,
      this.baseURL,
    );
  }

  @Mutation(() => DeleteResponseDTO)
  async deleteBand(@Args('id') id: string) {
    return this.bandsService.delete(id, this.baseURL);
  }
}
