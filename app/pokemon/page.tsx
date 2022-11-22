import axios from 'axios';
import React from 'react';
import { ListApiResponse, PokemonSpeciesApiResponse } from '../../poke-api-types';
import PokemonSpeciesList from './pokemon-list';

const LIMIT = 40;

async function getPokemonSpeciesList(offset: number): Promise<ListApiResponse> {
  return (await axios.get(`${process.env.POKE_API_SPECIES}/?offset=${offset}&limit=${LIMIT}`)).data;
}

async function getPokemonSpecies(url: string): Promise<PokemonSpeciesApiResponse> {
  return (await axios.get(url)).data;
}

export default async function PokemonList() {
  let speciesNamedResources = (await getPokemonSpeciesList(0)).results;
  let species = (await Promise.all(speciesNamedResources.map(({ url }) => getPokemonSpecies(url))));

  return <PokemonSpeciesList species={species} offset={LIMIT} />;
}

