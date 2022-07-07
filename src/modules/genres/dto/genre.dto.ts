import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Genre {
  @Field(() => ID)
  id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly country: string;

  @Field(() => Int)
  readonly year: number;
}
