import React from 'react';
import { getPokemon } from '~/src/api/pokemon';

// This is where pokemon details are displayed
// The list (in the layout) should become a list of links and each link points to /pokemon/name
// this page uses the query params to fetch the pokemon's details and renders a portal
export default async function Page({ params }: { params: Record<string, string[]> }) {
  let { name = [] } = params;

  if (!name.length) {
    return <div></div>;
  }

  let pokemon = await getPokemon(`${process.env.NEXT_PUBLIC_POKE_API_POKEMON}/${name[0]}`);

  return (
    <h1 style={{ color: 'red' }}>
      {pokemon.name}
    </h1>
  );
}
