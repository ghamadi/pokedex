import axios from 'axios';
import { cache } from 'react';
import { ListApiResponse, PokemonApiResponse } from '../../poke-api-types';

export const getPokemonList = cache(async (offset: number, limit?: number): Promise<ListApiResponse> => {
  let limitParam = limit ? `limit=${limit}` : '';
  return (await axios.get(`${process.env.NEXT_PUBLIC_POKE_API_POKEMON}/?${limitParam}&offset=${offset}`)).data;
});

export const getPokemon = cache(async (url: string): Promise<PokemonApiResponse> => (await axios.get(url)).data);