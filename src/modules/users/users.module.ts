import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users/users.resolver';

@Module({
  providers: [UsersResolver]
})
export class UsersModule {}
