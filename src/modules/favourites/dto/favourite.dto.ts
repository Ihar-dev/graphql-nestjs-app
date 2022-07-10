import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Band } from '../../bands/dto/band.dto';
import { Artist } from '../../artists/dto/artist.dto';
import { Genre } from '../../genres/dto/genre.dto';
import { Track } from '../../tracks/dto/track.dto';

@ObjectType()
export class Favourites {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => [Band])
  readonly bands: Band[];

  @Field(() => [Genre])
  readonly genres: Genre[];

  @Field(() => [Artist])
  readonly artists: Artist[];

  @Field(() => [Track])
  readonly tracks: Track[];
}
