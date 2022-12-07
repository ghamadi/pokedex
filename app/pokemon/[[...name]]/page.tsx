import { notFound } from 'next/navigation';
import PokemonDetailsCard from '~/app/components/details-card';

interface PageParams {
  name?: string | string[];
}

export default async function PokemonDetailsPage({ params }: { params: PageParams }) {
  let { name } = params;

  if (!isValidNameParam(name)) {
    return notFound();
  }

  let pokemonName = [name].flat().join('');

  if (!pokemonName) {
    return <div>Select a pokemon to view its details</div>;
  }

  //@ts-ignore (workaround because PokemonDetailsCard is a server component. Nextjs people are working on this.)
  return <PokemonDetailsCard idString={pokemonName} />;
}

function isValidNameParam(name: string | string[] | undefined) {
  return !Array.isArray(name) || name.length === 1;
}