import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';

@InputType()
export class MemberInputDTO {
  @Field({ nullable: true })
  @IsOptional()
  readonly artist?: string;

  @Field({ nullable: true })
  @IsOptional()
  readonly instrument?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  readonly years?: string[];
}
