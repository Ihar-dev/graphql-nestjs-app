import { Injectable } from '@nestjs/common';

import { SharedService } from '../shared/shared.service';
import { ArtistCreateUpdateDTO } from './dto/artist-create-update.dto';
import { Artist } from './dto/artist.dto';
import { BandCreateUpdateDTO } from '../bands/dto/band-create-update.dto';

@Injectable()
export class ArtistsService extends SharedService {
  private readonly BandsDefaultData: BandCreateUpdateDTO;
  private readonly BandsBaseURL: string;

  constructor() {
    super();
    this.BandsDefaultData = {
      id: '',
      name: '',
      members: [],
      genresIds: [],
    };
    this.BandsBaseURL = process.env.BANDS_URL;
  }

  public async getArtistById(
    id: string,
    defaultData: ArtistCreateUpdateDTO,
    baseURL: string,
  ): Promise<Artist> {
    const initialArtist: ArtistCreateUpdateDTO = await super.getById(
      id,
      defaultData,
      baseURL,
    );

    const Artist = await this.getArtist(initialArtist);

    return Artist;
  }

  private async getArtist(
    initialArtist: ArtistCreateUpdateDTO,
  ): Promise<Artist> {
    const artist = {
      id: '',
      firstName: '',
      secondName: '',
      middleName: '',
      birthDate: '',
      birthPlace: '',
      country: '',
      bands: [],
      instruments: [],
    };

    if (initialArtist.id) artist.id = initialArtist.id;
    if (initialArtist.firstName) artist.firstName = initialArtist.firstName;
    if (initialArtist.secondName) artist.secondName = initialArtist.secondName;
    if (initialArtist.middleName) artist.middleName = initialArtist.middleName;
    else artist.middleName = null;
    if (initialArtist.birthDate) artist.birthDate = initialArtist.birthDate;
    else artist.birthDate = null;
    if (initialArtist.birthPlace) artist.birthPlace = initialArtist.birthPlace;
    else artist.birthPlace = null;
    if (initialArtist.country) artist.country = initialArtist.country;
    artist.bands = await Promise.all(
      initialArtist.bandsIds.map(id =>
        super.getBandById(id, this.BandsDefaultData, this.BandsBaseURL),
      ),
    );
    if (initialArtist.instruments)
      artist.instruments = initialArtist.instruments;
    else artist.instruments = null;
    return artist;
  }

  public async getAllArtists(
    defaultData: ArtistCreateUpdateDTO,
    baseURL: string,
    limit: number,
    offset: number,
  ): Promise<Artist[]> {
    const initialArtists = await super.getAll(
      defaultData,
      baseURL,
      limit,
      offset,
    );

    const artists: Artist[] = await Promise.all(
      initialArtists.map(initialArtist => this.getArtist(initialArtist)),
    );

    return artists;
  }
}
