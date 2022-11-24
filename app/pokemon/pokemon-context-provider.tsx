'use client';

import React, { ReactNode, useMemo, useState } from 'react';
import { createContext } from 'react';
import { NamedApiResource } from '~/poke-api-types';

interface PokemonData {
  namedResources: NamedApiResource[];
}

interface PokemonContextType {
  data: PokemonData;
  setData: (data: Partial<PokemonData>) => void;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export default function PokemonContextProvider({ children, data }: { children: ReactNode; data: PokemonData }) {
  let [state, setState] = useState(data);

  let context = useMemo<PokemonContextType>(() => ({
    data: state,
    setData: newData => setState(currentState => ({ ...currentState, ...newData }))
  }), [state]);

  return (
    <PokemonContext.Provider value={context}>
      {children}
    </PokemonContext.Provider>
  );
}
