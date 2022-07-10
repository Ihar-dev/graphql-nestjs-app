import { Injectable } from '@nestjs/common';

import { SharedService } from '../shared/shared.service';
import { AlbumCreateUpdateDTO } from './dto/album-create-update.dto';
import { Album } from './dto/album.dto';

@Injectable()
export class AlbumsService extends SharedService {
  public async getAllAlbums(
    defaultData: AlbumCreateUpdateDTO,
    baseURL: string,
    limit: number,
    offset: number,
    circle: number,
  ): Promise<Album[]> {
    const initialAlbums = await super.getAll(
      defaultData,
      baseURL,
      limit,
      offset,
    );

    const albums: Album[] = await Promise.all(
      initialAlbums.map(initialAlbum => super.getAlbum(initialAlbum, circle)),
    );

    return albums;
  }
}
