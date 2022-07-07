import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DeleteResponseDTO {
  @Field()
  readonly name: string;

  @Field(() => Boolean)
  readonly acknowledged: boolean;

  @Field(() => Int)
  readonly deletedCount: number;
}
