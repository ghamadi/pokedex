import { PokemonApiResponse } from '~/poke-api-types';
import { TYPE_TO_COLOR } from '~/src/constants';
import styles from './details-card.module.scss';

interface DetailsCardProps {
  pokemon: PokemonApiResponse;
}

export default function PokemonDetailsCard({ pokemon }: DetailsCardProps) {
  let backgroundColor = TYPE_TO_COLOR[pokemon.types[0].type.name];

  return (
    <div className={styles.card} style={{ backgroundColor }}>
      <div className={styles.card__header}>
        <span className={styles.card__name}></span>
        <span className={styles.card__id}></span>
      </div>

      <div className={styles.card__picture}></div>

      <div className={styles.card__detailsWrapper}>
        <div className={styles.card__types}></div>
        <div className={styles.card__about}></div>
        <div className={styles.card__stats}></div>
      </div>
    </div>
  );
}
