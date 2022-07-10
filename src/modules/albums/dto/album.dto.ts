import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

import { Band } from '../../bands/dto/band.dto';
import { Artist } from '../../artists/dto/artist.dto';
import { Genre } from '../../genres/dto/genre.dto';
import { Track } from '../../tracks/dto/track.dto';

@ObjectType()
export class Album {
  @Field(() => ID)
  id: string;

  @Field()
  readonly name: string;

  @Field(() => Int, { nullable: true })
  readonly released: number;

  @Field(() => [Artist])
  readonly artists: Artist[];

  @Field(() => [Band])
  readonly bands: Band[];

  /* @Field(() => [Track], { nullable: true })
  readonly tracks: Track[]; */

  @Field(() => [Genre])
  readonly genres: Genre[];

  @Field({ nullable: true })
  readonly image: string;
}
