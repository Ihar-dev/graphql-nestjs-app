import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class JwtDTO {
  @Field()
  readonly jwt: string;
}
