import { Injectable } from '@nestjs/common';

import { SharedService } from '../shared/shared.service';
import { BandCreateUpdateDTO } from './dto/band-create-update.dto';
//import { Band } from './dto/band.dto';

@Injectable()
export class BandsService extends SharedService {
  public async getAllBands(
    defaultData: BandCreateUpdateDTO,
    baseURL: string,
    limit: number,
    offset: number,
  ): Promise<BandCreateUpdateDTO[]> {
    const bands = await this.getAll(defaultData, baseURL, limit, offset);

    /* const bands: Band[] = await Promise.all(
      initialBands.map(initialBand => super.getBand(initialBand)),
    ); */

    return bands;
  }
}
