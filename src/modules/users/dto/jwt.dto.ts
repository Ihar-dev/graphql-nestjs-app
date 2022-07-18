import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class JWT {
  @Field()
  readonly jwt: string;
}
