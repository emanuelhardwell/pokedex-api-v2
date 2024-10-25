import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { HandleError } from '../utils/HandleError';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    private readonly handleError: HandleError,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  // refactor (create Adapter for request)
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    try {
      await this.pokemonModel.deleteMany();

      const pokemons = await this.axios.get<PokemonResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0',
      );

      const pokemonsAll: { name: string; no: number }[] = [];

      pokemons.data.results.forEach(({ name, url }) => {
        const segments = url.split('/');
        const no = +segments[segments.length - 2];

        pokemonsAll.push({ name, no });
      });

      await this.pokemonModel.insertMany(pokemonsAll);

      return { message: 'Pokemons saved !!', pokemon: pokemonsAll };
    } catch (error) {
      this.handleError.handleErrorService(error);
    }
  }
}
