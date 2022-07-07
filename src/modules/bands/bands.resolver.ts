import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BandsService } from './bands.service';
import { Band } from './dto/band.dto';
import { BandInput } from './interfaces/band-input.interface';
import { MemberInputDTO } from './dto/member-input.dto';

@Resolver()
export class BandsResolver {
  private readonly defaultData: Band;

  constructor(private readonly bandsService: BandsService) {
    this.defaultData = {
      id: '',
      name: '',
      members: [],
      genresIds: [],
    };
  }

  @Mutation(() => Band)
  async createBand(
    @Args('name') name: string,
    @Args('origin', { nullable: true }) origin?: string,
    @Args('members', { nullable: true, type: () => [MemberInputDTO] })
    members?: MemberInputDTO[],
    @Args('website', { nullable: true }) website?: string,
    @Args('genresIds', { nullable: true, type: () => [String] })
    genresIds?: string[],
  ) {
    const inputData: BandInput = { name };
    if (origin) inputData.origin = origin;
    if (members) inputData.members = members;
    if (website) inputData.website = website;
    if (genresIds) inputData.genresIds = genresIds;
    return this.bandsService.create(
      inputData,
      this.defaultData,
      process.env.BANDS_URL,
    );
  }
}
