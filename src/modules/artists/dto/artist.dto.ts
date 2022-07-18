import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Band } from '../../bands/dto/band.dto';

@ObjectType()
export class Artist {
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

  @Field(() => [Band])
  readonly bands: Band[];

  @Field(() => [String])
  readonly instruments: string[];
}
