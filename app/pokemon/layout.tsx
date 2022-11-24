import React, { ReactNode } from 'react';
import PokemonList from './pokemon-list';
import { getPokemon, getPokemonList } from '~/src/api/pokemon';
import PokemonContextProvider from '~/app/pokemon/pokemon-context-provider';

const LIMIT = 40;

export default async function PokemonPageLayout({ children }: { children: ReactNode }) {
  let count = (await getPokemonList(0, 1)).count;
  let namedResources = (await getPokemonList(0, count)).results;
  let pokemon = (await Promise.all(namedResources.slice(0, LIMIT).map(({ url }) => getPokemon(url))));

  return (
    <PokemonContextProvider data={{ namedResources }}>
      <div style={{ position: 'relative', width: 500, marginLeft: 100 }}>
        <PokemonList pokemon={pokemon} />
        <div style={{ position: 'fixed', top: 0, left: 800 }}>
          {children}
        </div>
      </div>
    </PokemonContextProvider>
  );
}

