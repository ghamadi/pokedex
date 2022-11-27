import { notFound } from 'next/navigation';
import { PokemonAPI } from '~/src/api/pokemon';

export default async function PokemonDetailsPage({ params }: { params: { name?: string | string[] } }) {
  let pokemonName = [params.name].flat().join('');

  if (!pokemonName) {
    return <div></div>;
  }

  try {
    let api = new PokemonAPI();
    let pokemon = await api.get(pokemonName);

    return (
      <div>
        <p>{pokemon.id}</p>
        <p>{pokemon.name}</p>
      </div>
    );

  } catch (error) {
    return notFound();
  }
}
