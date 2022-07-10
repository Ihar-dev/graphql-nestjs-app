import { Injectable } from '@nestjs/common';

import { SharedService } from '../shared/shared.service';
import { TrackCreateUpdateDTO } from './dto/track-create-update.dto';
import { Track } from './dto/track.dto';

@Injectable()
export class TracksService extends SharedService {
  public async getAllTracks(
    defaultData: TrackCreateUpdateDTO,
    baseURL: string,
    limit: number,
    offset: number,
    circle: number,
  ): Promise<Track[]> {
    const initialTracks = await super.getAll(
      defaultData,
      baseURL,
      limit,
      offset,
    );

    const artists: Track[] = await Promise.all(
      initialTracks.map(initialTrack => super.getTrack(initialTrack, circle)),
    );

    return artists;
  }
}
