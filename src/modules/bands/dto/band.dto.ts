import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Member } from './member.dto';

@ObjectType()
export class Band {
  @Field(() => ID)
  id: string;

  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly origin?: string;

  @Field(() => [Member])
  readonly members: Member[];

  @Field({ nullable: true })
  readonly website?: string;

  @Field(() => [String])
  readonly genresIds: string[];
}
