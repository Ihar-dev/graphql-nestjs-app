import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Member } from './member.dto';
import { Genre } from '../../genres/dto/genre.dto';

@ObjectType()
export class Band {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  origin?: string;

  @Field(() => [Member])
  members: Member[];

  @Field({ nullable: true })
  website?: string;

  @Field(() => [Genre])
  genres: Genre[];
}
