import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class AlbumCreateUpdateDTO {
  @Field(() => ID)
  id: string;

  @Field()
  readonly name: string;

  @Field(() => Int, { nullable: true })
  readonly released?: number;

  @Field(() => [String])
  readonly artistsIds: string[];

  @Field(() => [String])
  readonly bandsIds: string[];

  @Field(() => [String])
  readonly trackIds: string[];

  @Field(() => [String])
  readonly genresIds: string[];

  @Field({ nullable: true })
  readonly image?: string;
}
