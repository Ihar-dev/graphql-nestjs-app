import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { AlbumsResolver } from './albums.resolver';

@Module({
  providers: [ServicesService, AlbumsResolver],
})
export class AlbumsModule {}
