'use client';
import { PokemonApiResponse } from '~/src/poke-api-types';
import { TYPE_TO_COLOR } from '~/src/constants';
import { formatId, formatPokemonName } from '~/src/utils/string';
import styles from './details-card.module.scss';
import PokemonTypeChip from '~/app/pokemon/components/type-chip';

interface DetailsCardProps {
  pokemon: PokemonApiResponse;
}

export default function PokemonDetailsCard({ pokemon }: DetailsCardProps) {
  let { id, name, types, sprites } = pokemon;
  let typeColor = TYPE_TO_COLOR[pokemon.types[0].type.name];

  return (
    <div className={styles.card} style={{ backgroundColor: typeColor }}>
      <div className={styles.card__header}>
        <span className={styles.card__name}>{formatPokemonName(name)}</span>
        <span className={styles.card__id}>{formatId(id)}</span>
      </div>

      <img
        className={styles.card__picture}
        src={sprites.other['official-artwork'].front_default}
      />

      <div className={styles.card__detailsWrapper}>
        <div className={styles.card__types}></div>
        <div className={styles.card__about}>
          <p className={styles.card__aboutLabel} style={{ color: typeColor }}>About</p>
          <div className={styles.card__aboutDetails}>
            <div className={styles.card__detailDisplay}>
              {types.map(type => <PokemonTypeChip key={type.type.name} type={type.type.name} />)}
            </div>
          </div>
        </div>
        <div className={styles.card__stats}></div>
      </div>
    </div>
  );
}
