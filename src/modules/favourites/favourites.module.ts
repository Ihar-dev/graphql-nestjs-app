import { Module } from '@nestjs/common';
import { FavouritesResolver } from './favourites.resolver';
import { FavouritesService } from './favourites.service';

@Module({
  providers: [FavouritesResolver, FavouritesService]
})
export class FavouritesModule {}
