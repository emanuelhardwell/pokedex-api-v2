import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { HandleError } from 'src/utils/HandleError';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly handleError: HandleError,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      this.handleError.handleErrorService(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    try {
      let pokemon: Pokemon;

      if (!isNaN(+term)) {
        pokemon = await this.pokemonModel.findOne({ no: term });
      }
      if (!pokemon && isValidObjectId(term)) {
        pokemon = await this.pokemonModel.findOne({ _id: term });
      }
      if (!pokemon) {
        pokemon = await this.pokemonModel.findOne({
          name: term.toLocaleLowerCase().trim(),
        });
      }

      if (!pokemon) {
        throw new NotFoundException(
          `Pockemon serached by Id, Name, No ${term} not found`,
        );
      }

      return pokemon;
    } catch (error) {
      this.handleError.handleErrorService(error);
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);

      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name
          .toLocaleLowerCase()
          .trim();
        await pokemon.updateOne(updatePokemonDto);
        return { ...pokemon.toJSON(), ...updatePokemonDto };
      }
    } catch (error) {
      this.handleError.handleErrorService(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
