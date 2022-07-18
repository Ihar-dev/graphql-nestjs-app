import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class TrackCreateUpdateDTO {
  @Field(() => ID)
  id: string;

  @Field()
  readonly title: string;

  @Field()
  readonly albumId: string;

  @Field(() => [String])
  readonly bandsIds: string[];

  @Field(() => [String])
  readonly artistsIds: string[];

  @Field(() => Int)
  readonly duration: number;

  @Field(() => Int)
  readonly released: number;

  @Field(() => [String])
  readonly genresIds: string[];
}
