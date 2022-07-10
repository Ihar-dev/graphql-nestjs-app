import { Injectable } from '@nestjs/common';

import { SharedService } from '../shared/shared.service';
import { ArtistCreateUpdateDTO } from './dto/artist-create-update.dto';
import { Artist } from './dto/artist.dto';

@Injectable()
export class ArtistsService extends SharedService {
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
      initialArtists.map(initialArtist => super.getArtist(initialArtist)),
    );

    return artists;
  }
}
