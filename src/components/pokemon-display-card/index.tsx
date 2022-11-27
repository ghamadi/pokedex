'use client';

import { useQuery } from 'react-query';
import { PokemonAPI } from '~/src/api/pokemon';
import { TYPE_TO_COLOR } from '~/src/constants';
import styles from './styles.module.scss';

interface PokemonDisplayCardProps {
  id: string;
  width?: number | string;
  height?: number | string;
}

export default function PokemonDisplayCard(props: PokemonDisplayCardProps) {
  let { id: idString, width = '100%', height = '100%' } = props;
  let api = new PokemonAPI();
  let { data: pokemon, isError, isLoading } = useQuery(['getPokemon', idString], () => api.get(idString));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return null;
  }

  let { id, name, sprites, types } = pokemon!;
  let artworkSrc = sprites.other['official-artwork'].front_default;
  let color = TYPE_TO_COLOR[(types[0] ?? {}).type?.name ?? 'unknown'];
  width = isNaN(width as number) ? width : `${width}px`;

  return (
    <div
      className={styles.pokemonCard}
      style={{ backgroundImage: `url(${artworkSrc})`, borderColor: color, width, height: height ?? `calc(${width} * 1.15)` }}
    >
      <div className={styles.pokemonCard__idHolder}>
        <span style={{ color }}>#{`${id}`.padStart(4, '0')}</span>
      </div>
      <div className={styles.pokemonCard__nameHolder} style={{ backgroundColor: color, borderColor: color }}>
        <span>{name}</span>
      </div>
    </div>
  );
}
