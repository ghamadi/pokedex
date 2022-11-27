'use client';

import { useQuery } from 'react-query';
import { PokemonAPI } from '~/src/api/pokemon';
import styles from './styles.module.scss';

interface PokemonDisplayCardProps {
  id: string;
  width?: number | string;
  height?: number | string;
}

const TYPE_TO_COLOR: Record<string, string> = {
  fairy: '#E69EAC',
  normal: '#AAA67F',
  fighting: '#C12239',
  flying: '#A891EC',
  poison: '#A43E9E',
  ground: '#DEC16B',
  rock: '#B69E31',
  bug: '#A7B723',
  ghost: '#70559B',
  steel: '#B7B9D0',
  fire: '#F57D31',
  water: '#6493EB',
  grass: '#74CB48',
  electric: '#F9CF30',
  psychic: '#FB5584',
  ice: '#9AD6DF',
  dragon: '#7037FF',
  dark: '#75574C',
  unknown: '#666666',
  shadow: '#807870'
};

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
