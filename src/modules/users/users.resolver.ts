import { Resolver, Query, Args } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { JwtDTO } from './dto/jwt.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => JwtDTO)
  async jwt(@Args('email') email: string, @Args('password') password: string) {
    return this.usersService.login({ email, password });
  }
}
