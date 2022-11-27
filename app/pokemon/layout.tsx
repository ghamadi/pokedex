import React, { ReactNode } from 'react';
import PokemonCardsGrid from '~/app/pokemon/(components)/cards-grid';
import { PokemonAPI } from '~/src/api/pokemon';
import styles from './styles.module.scss';

export default async function PokemonPageLayout({ children }: { children: ReactNode }) {
  let api = new PokemonAPI();
  let count = (await api.getList({ offset: 0 })).count;
  let pokemonNames = (await api.getList({ offset: 0, limit: count })).results.map(({ name }) => name);

  return (
    <div className={styles.layout}>
      <PokemonCardsGrid names={pokemonNames} />
      <div className={styles.layout__detailsWrapper}>
        {children}
      </div>
    </div>
  );
}
