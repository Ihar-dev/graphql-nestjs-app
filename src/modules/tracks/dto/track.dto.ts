import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

import { Band } from '../../bands/dto/band.dto';
import { Artist } from '../../artists/dto/artist.dto';
import { Genre } from '../../genres/dto/genre.dto';

@ObjectType()
export class Track {
  @Field(() => ID)
  id: string;

  @Field()
  readonly title: string;

  @Field()
  readonly album: string;

  @Field(() => [Artist])
  readonly artists: Artist[];

  @Field(() => [Band])
  readonly bands: Band[];

  @Field(() => Int)
  readonly duration: number;

  @Field(() => Int)
  readonly released: number;

  @Field(() => [Genre])
  readonly genres: Genre[];
}
