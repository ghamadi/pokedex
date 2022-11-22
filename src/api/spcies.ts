import axios from 'axios';
import { ListApiResponse, PokemonSpeciesApiResponse } from '../../poke-api-types';

export async function getPokemonSpeciesList(offset: number, limit: number): Promise<ListApiResponse> {
  return (await axios.get(`${process.env.POKE_API_SPECIES}/?offset=${offset}&limit=${limit}`)).data;
}

export async function getPokemonSpecies(url: string): Promise<PokemonSpeciesApiResponse> {
  return (await axios.get(url)).data;
}