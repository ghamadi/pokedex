import { useContext } from 'react';
import { PokemonContext } from '~/app/pokemon/pokemon-context-provider';

export function usePokemon() {
  let pokemonContext = useContext(PokemonContext);

  if (!pokemonContext) {
    throw new Error('usePokemon must be used within a PokemonContextProvider');
  }

  return pokemonContext;
}