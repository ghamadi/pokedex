import React from 'react';
import { getPokemonSpecies, getPokemonSpeciesList } from '../../src/api/spcies';
import PokemonSpeciesList from './pokemon-list';

const LIMIT = 40;

export default async function PokemonList() {
  let speciesNamedResources = (await getPokemonSpeciesList(0, LIMIT)).results;
  let species = (await Promise.all(speciesNamedResources.map(({ url }) => getPokemonSpecies(url))));

  return <PokemonSpeciesList species={species} offset={LIMIT} />;
}

