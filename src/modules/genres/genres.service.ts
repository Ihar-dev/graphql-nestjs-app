import { Injectable } from '@nestjs/common';

import { SharedService } from '../shared/shared.service';

@Injectable()
export class GenresService extends SharedService {}
