'use client';

import React, { ReactNode } from 'react';
import { createContext } from 'react';
import { NamedApiResource } from '~/poke-api-types';

interface PokemonContextType {
  namedResources: NamedApiResource[];
}

export const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export default function PokemonContextProvider({ children, data }: { children: ReactNode; data: PokemonContextType }) {
  return (
    <PokemonContext.Provider value={data}>
      {children}
    </PokemonContext.Provider>
  );
}
