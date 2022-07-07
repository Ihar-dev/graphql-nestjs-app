import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class GenreInputDTO {
  @Field()
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsNotEmpty()
  @IsOptional()
  readonly description: string;

  @Field()
  @IsNotEmpty()
  @IsOptional()
  readonly country: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  readonly year: number;
}
