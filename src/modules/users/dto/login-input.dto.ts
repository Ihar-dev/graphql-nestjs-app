import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInputDTO {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}
