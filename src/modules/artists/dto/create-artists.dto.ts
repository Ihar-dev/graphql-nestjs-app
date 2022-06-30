import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateArtistDTO {
  @Field(() => ID)
  @Field()
  readonly firstName: string;
  @Field()
  readonly secondName: string;
  @Field()
  readonly middleName: string;
  @Field()
  readonly birthDate: string;
  @Field()
  readonly birthPlace: string;
  @Field()
  readonly country: string;
  @Field()
  readonly instruments: string;
}
