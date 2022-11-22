import React from 'react';
import { getPokemon, getPokemonSpeciesList } from '../../src/api/spcies';
import PokemonSpeciesList from './pokemon-list';

const LIMIT = 40;

export default async function PokemonList() {
  let speciesNamedResources = (await getPokemonSpeciesList(0, LIMIT)).results;
  let species = (await Promise.all(speciesNamedResources.map(({ name }) => getPokemon(`${process.env.NEXT_PUBLIC_POKE_API_POKEMON}/${name}`))));

  return <PokemonSpeciesList species={species} />;
}

