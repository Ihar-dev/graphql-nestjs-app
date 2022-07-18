import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class RegisterInputDTO {
  @Field()
  readonly firstName: string;

  @Field()
  readonly lastName: string;

  @Field()
  @Length(8)
  readonly password: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
