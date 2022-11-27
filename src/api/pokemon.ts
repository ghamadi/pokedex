import axios from 'axios';
import { cache } from 'react';
import { ListApiResponse, PokemonApiResponse, PokemonSpeciesApiResponse } from '../../poke-api-types';

export const getPokemonList = cache(async (offset: number, limit?: number): Promise<ListApiResponse> => {
  let limitParam = limit ? `limit=${limit}` : '';
  return (await axios.get(`${process.env.NEXT_PUBLIC_POKE_API_POKEMON}/?${limitParam}&offset=${offset}`)).data;
});

export const getPokemon = cache(async (url: string): Promise<PokemonApiResponse> => (await axios.get(url)).data);

const API_PATH = process.env.NEXT_PUBLIC_POKE_API ?? '';

export class PokemonAPI {
  get = cache(async (id: string | number) => {
    let url = `${API_PATH}/pokemon/${id}`;
    return (await axios.get(url)).data as Promise<PokemonApiResponse>;
  });

  getSpeciesOf = cache(async (pokemonId: string | number) => {
    let speciesURL = (await this.get(pokemonId)).species.url;
    return (await axios.get(speciesURL)).data as PokemonSpeciesApiResponse;
  });

  getList = cache(async ({ offset = 0, limit }: { offset?: number; limit?: number }) => {
    let url = this.buildURL({ params: { offset } });
    let count = limit ?? (await axios.get(url)).data.count as number;
    url = this.buildURL({ href: url, params: { limit: count } });
    return (await axios.get(url)).data as Promise<PokemonApiResponse[]>;
  });

  getColorOf = cache(async (pokemonId: string | number) => (await this.getSpeciesOf(pokemonId)).color.name);

  private buildURL({ href, params }: { href?: string; params?: Record<string, unknown> }) {
    let url = new URL(href ?? API_PATH);
    Object.entries(params ?? {}).forEach(([key, val]) => url.searchParams.set(key, `${val}`));
    return url.href;
  }
}