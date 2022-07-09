import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { UsersModule } from './modules/users/users.module';
import { GenresModule } from './modules/genres/genres.module';
import { SharedModule } from './modules/shared/shared.module';
import { BandsModule } from './modules/bands/bands.module';
import { TracksModule } from './modules/tracks/tracks.module';

@Module({
  imports: [
    ArtistsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AlbumsModule,
    UsersModule,
    GenresModule,
    SharedModule,
    BandsModule,
    TracksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
