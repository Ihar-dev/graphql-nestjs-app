import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { JWT } from './dto/jwt.dto';
import { User } from './dto/user.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => JWT)
  async jwt(@Args('email') email: string, @Args('password') password: string) {
    return this.usersService.login({ email, password });
  }

  @Query(() => User)
  async user(@Args('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Mutation(() => User)
  async register(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('password') password: string,
    @Args('email') email: string,
  ) {
    return this.usersService.register({ firstName, lastName, password, email });
  }
}
