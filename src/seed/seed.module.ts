import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HandleError } from 'src/utils/HandleError';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Module({
  imports: [PokemonModule],
  controllers: [SeedController],
  providers: [SeedService, HandleError, AxiosAdapter],
})
export class SeedModule {}
