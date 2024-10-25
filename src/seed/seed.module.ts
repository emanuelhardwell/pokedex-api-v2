import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HandleError } from 'src/utils/HandleError';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  imports: [PokemonModule],
  controllers: [SeedController],
  providers: [SeedService, HandleError],
})
export class SeedModule {}
