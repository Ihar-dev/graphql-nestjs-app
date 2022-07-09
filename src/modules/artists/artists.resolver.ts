import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ArtistsService } from './artists.service';
import { ArtistCreateUpdateDTO } from './dto/artist-create-update.dto';
import { ArtistCreateUpdateInput } from './interfaces/artist-input.interface';
import { DeleteResponseDTO } from '../shared/dto/delete-response.dto';
import { Artist } from './dto/artist.dto';

@Resolver('Artist')
export class ArtistsResolver {
  private readonly defaultData: ArtistCreateUpdateDTO;
  private readonly baseURL: string;

  constructor(private readonly artistsService: ArtistsService) {
    this.defaultData = {
      id: '',
      firstName: '',
      secondName: '',
      country: '',
      bandsIds: [],
      instruments: [],
    };
    this.baseURL = process.env.ARTISTS_URL;
  }

  @Query(() => Artist)
  async artist(@Args('id') id: string) {
    return this.artistsService.getArtistById(
      id,
      this.defaultData,
      this.baseURL,
    );
  }

  @Query(() => [Artist])
  async artists(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.artistsService.getAllArtists(
      this.defaultData,
      this.baseURL,
      limit,
      offset,
    );
  }

  @Mutation(() => ArtistCreateUpdateDTO)
  async createArtist(
    @Args('firstName') firstName: string,
    @Args('secondName') secondName: string,
    @Args('country') country: string,
    @Args('middleName', { nullable: true }) middleName?: string,
    @Args('birthDate', { nullable: true }) birthDate?: string,
    @Args('birthPlace', { nullable: true }) birthPlace?: string,
    @Args('bandsIds', { nullable: true, type: () => [String] })
    bandsIds?: string[],
    @Args('instruments', { nullable: true, type: () => [String] })
    instruments?: string[],
  ) {
    const inputData: ArtistCreateUpdateInput = {
      firstName,
      secondName,
      country,
    };
    if (middleName) inputData.middleName = middleName;
    if (birthDate) inputData.birthDate = birthDate;
    if (birthPlace) inputData.birthPlace = birthPlace;
    if (bandsIds) inputData.bandsIds = bandsIds;
    if (instruments) inputData.instruments = instruments;
    return this.artistsService.create(
      inputData,
      this.defaultData,
      this.baseURL,
    );
  }

  @Mutation(() => ArtistCreateUpdateDTO)
  async updateArtist(
    @Args('id') id: string,
    @Args('firstName') firstName: string,
    @Args('secondName') secondName: string,
    @Args('country') country: string,
    @Args('middleName', { nullable: true }) middleName?: string,
    @Args('birthDate', { nullable: true }) birthDate?: string,
    @Args('birthPlace', { nullable: true }) birthPlace?: string,
    @Args('bandsIds', { nullable: true, type: () => [String] })
    bandsIds?: string[],
    @Args('instruments', { nullable: true, type: () => [String] })
    instruments?: string[],
  ) {
    const inputData: ArtistCreateUpdateInput = {
      firstName,
      secondName,
      country,
    };
    if (middleName) inputData.middleName = middleName;
    if (birthDate) inputData.birthDate = birthDate;
    if (birthPlace) inputData.birthPlace = birthPlace;
    if (bandsIds) inputData.bandsIds = bandsIds;
    if (instruments) inputData.instruments = instruments;
    return this.artistsService.update(
      id,
      inputData,
      this.defaultData,
      this.baseURL,
    );
  }

  @Mutation(() => DeleteResponseDTO)
  async deleteArtist(@Args('id') id: string) {
    return this.artistsService.delete(id, this.baseURL);
  }
}
