import axios from 'axios';
import { ListApiResponse, PokemonApiResponse } from '../../poke-api-types';

export async function getPokemonSpeciesList(offset: number, limit: number): Promise<ListApiResponse> {
  return (await axios.get(`${process.env.NEXT_PUBLIC_POKE_API_POKEMON}/?offset=${offset}&limit=${limit}`)).data;
}

export async function getPokemon(url: string): Promise<PokemonApiResponse> {
  return (await axios.get(url)).data;
}