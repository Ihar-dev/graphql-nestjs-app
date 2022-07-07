import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

import { MemberInputDTO } from './member-input.dto';

@InputType()
export class BandInputDTO {
  @Field()
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsOptional()
  readonly origin?: string;

  @Field(() => [MemberInputDTO])
  @IsOptional()
  @IsArray()
  readonly members: MemberInputDTO[];

  @Field()
  @IsOptional()
  readonly website?: string;

  @Field(() => [String])
  @IsOptional()
  @IsArray()
  readonly genresIds: string[];
}
