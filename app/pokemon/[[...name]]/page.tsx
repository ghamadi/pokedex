import { notFound } from 'next/navigation';
import PokemonDetailsCard from '~/app/pokemon/(components)/details-card';
import { PokemonAPI } from '~/src/api/pokemon';

export default async function PokemonDetailsPage({ params }: { params: { name?: string | string[] } }) {
  let pokemonName = [params.name].flat().join('');

  if (!pokemonName) {
    return <div></div>;
  }

  try {
    let api = new PokemonAPI();
    let pokemon = await api.get(pokemonName);

    return <PokemonDetailsCard pokemon={pokemon} />;
  } catch (error) {
    return notFound();
  }
}
