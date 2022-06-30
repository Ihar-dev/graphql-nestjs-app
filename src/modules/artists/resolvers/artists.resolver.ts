import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver()
export class ArtistsResolver {
  /* constructor(
    private authorsService: ArtistsService,
    private postsService: PostsService,
  ) {} */

  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
