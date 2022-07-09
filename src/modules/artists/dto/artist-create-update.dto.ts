import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ArtistCreateUpdateDTO {
  @Field(() => ID)
  id: string;

  @Field()
  readonly firstName: string;

  @Field()
  readonly secondName: string;

  @Field({ nullable: true })
  readonly middleName?: string;

  @Field({ nullable: true })
  readonly birthDate?: string;

  @Field({ nullable: true })
  readonly birthPlace?: string;

  @Field()
  readonly country: string;

  @Field(() => [String])
  readonly bandsIds: string[];

  @Field(() => [String])
  readonly instruments: string[];
}
