import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class FavouriteAddDTO {
  @Field(() => ID)
  id: string;

  @Field()
  readonly userId: string;

  @Field(() => [String], { nullable: true })
  readonly bandsIds?: string[];

  @Field(() => [String], { nullable: true })
  readonly genresIds?: string[];

  @Field(() => [String], { nullable: true })
  readonly artistsIds?: string[];

  @Field(() => [String], { nullable: true })
  readonly tracksIds?: string[];
}
