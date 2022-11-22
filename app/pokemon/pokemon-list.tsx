import React from 'react';
import { PokemonSpeciesApiResponse } from '../../poke-api-types';

interface PokemonSpeciesListProps {
  species: PokemonSpeciesApiResponse[];
  offset: number;
}

export default function PokemonSpeciesList(props: PokemonSpeciesListProps) {
  let { species } = props;
  return (
    <>
      {species.map(({ name, id }) => (
        <div key={name}>
          <p>id: {id}</p>
          <p>name: {name}</p>
          <hr />
        </div>
      ))}
    </>
  );
}
