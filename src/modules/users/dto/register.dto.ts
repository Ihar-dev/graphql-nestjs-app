import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RegisterResponseDTO {
  @Field()
  readonly id: string;
  @Field()
  readonly firstName: string;
  @Field()
  readonly lastName: string;
  @Field()
  readonly password: string;
  @Field()
  readonly email: string;
}
