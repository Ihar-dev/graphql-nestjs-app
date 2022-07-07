import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class GenreInputDTO {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @Field()
  @IsNotEmpty()
  @IsOptional()
  country: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  readonly year: number;
}
