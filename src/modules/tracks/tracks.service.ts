import { Injectable } from '@nestjs/common';

import { SharedService } from '../shared/shared.service';
import { TrackCreateUpdateDTO } from '../tracks/dto/track-create-update.dto';
import { Track } from '../tracks/dto/track.dto';

const CIRCLE_LIMIT = 10;

@Injectable()
export class TracksService extends SharedService {
  public async getTrackById(
    id: string,
    defaultData: TrackCreateUpdateDTO,
    baseURL: string,
  ): Promise<Track> {
    const initialTrack: TrackCreateUpdateDTO = await super.getById(
      id,
      defaultData,
      baseURL,
    );

    const track = await super.getTrack(initialTrack, CIRCLE_LIMIT);

    return track;
  }
}
