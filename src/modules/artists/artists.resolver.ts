import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { ArtistsService } from './artists.service';
import { ArtistCreateUpdateDTO } from './dto/artist-create-update.dto';
import { ArtistCreateUpdateInput } from './interfaces/artist-input.interface';
import { DeleteResponseDTO } from '../shared/dto/delete-response.dto';
import { Artist } from './dto/artist.dto';
import { Band } from '../bands/dto/band.dto';
import { BandCreateUpdateDTO } from '../bands/dto/band-create-update.dto';

@Resolver(() => Artist)
export class ArtistsResolver {
  private readonly defaultData: ArtistCreateUpdateDTO;
  private readonly baseURL: string;
  public readonly bandDefaultData: BandCreateUpdateDTO;
  public readonly bandsBaseURL: string;

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
    this.bandDefaultData = {
      id: '',
      name: '',
      members: [],
      genresIds: [],
    };
    this.bandsBaseURL = process.env.BANDS_URL;
  }

  @Query(() => Artist)
  async artist(@Args('id') id: string): Promise<ArtistCreateUpdateDTO> {
    return this.artistsService.getById(id, this.defaultData, this.baseURL);
  }

  @ResolveField(() => [Band])
  async bands(
    @Parent() artist: ArtistCreateUpdateDTO,
  ): Promise<BandCreateUpdateDTO[]> {
    const { bandsIds } = artist;
    return Promise.all(
      bandsIds.map(id => {
        return this.artistsService.getById(
          id,
          this.bandDefaultData,
          this.bandsBaseURL,
        );
      }),
    );
  }

  @Query(() => [Artist])
  async artists(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
  ): Promise<ArtistCreateUpdateDTO[]> {
    return this.artistsService.getAll(
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
  ): Promise<ArtistCreateUpdateDTO> {
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
  ): Promise<ArtistCreateUpdateDTO> {
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
  async deleteArtist(@Args('id') id: string): Promise<DeleteResponseDTO> {
    return this.artistsService.delete(id, this.baseURL);
  }
}
