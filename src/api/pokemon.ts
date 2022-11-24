import axios from 'axios';
import { ListApiResponse, PokemonApiResponse } from '../../poke-api-types';

export async function getPokemonList(offset: number, limit?: number): Promise<ListApiResponse> {
  let limitParam = limit ? `limit=${limit}` : '';
  return (await axios.get(`${process.env.NEXT_PUBLIC_POKE_API_POKEMON}/?${limitParam}&offset=${offset}`)).data;
}

export async function getPokemon(url: string): Promise<PokemonApiResponse> {
  return (await axios.get(url)).data;
}