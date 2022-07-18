import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field({ nullable: true })
  readonly artist: string;

  @Field({ nullable: true })
  readonly instrument: string;

  @Field(() => [String], { nullable: true })
  readonly years: string[];
}
