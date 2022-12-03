import { notFound } from 'next/navigation';
import PokemonDetailsCard from '~/app/components/details-card';
import { PokemonAPI } from '~/src/api/pokemon';

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

  try {
    let api = new PokemonAPI();
    let pokemon = await api.get(pokemonName);

    return <PokemonDetailsCard pokemon={pokemon} />;
  } catch (error) {
    return notFound();
  }
}

// function isValidPageNum(pageNum: string) {
//   return /^p\d+$/.test(pageNum);
// }

function isValidNameParam(name: string | string[] | undefined) {
  return !Array.isArray(name) || name.length === 1;
}