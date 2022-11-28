'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import PokemonDisplayCard from '~/app/pokemon/components/display-card';
import styles from './cards-grid.module.scss';
interface PokemonCardsListProps {
  names: string[];
  initialCount?: number;
}

export default function PokemonCardsList({ names, initialCount = 20 }: PokemonCardsListProps) {
  let [offset, setOffset] = useState(initialCount);
  let [wrapperEl, setWrapperEl] = useState<Element | null>(null);

  let updateOffset = useCallback(() => setOffset(currentOffset => currentOffset + 20), []);

  useEffect(() => {
    let wrapper = document.querySelector(`.${styles.cardsGrid}`);
    async function onScroll() {
      if (wrapper && offset < names.length) {
        let { scrollHeight, scrollTop, clientHeight } = wrapper;
        if (scrollHeight - scrollTop <= clientHeight * 1.5) {
          updateOffset();
        }
      }
    }

    wrapper?.addEventListener('scroll', onScroll);
    setWrapperEl(wrapper);
    return () => wrapper?.removeEventListener('scroll', onScroll);
  }, [names.length, offset, updateOffset]);

  return (
    <div className={styles.cardsGrid}>
      {names.slice(0, offset).map(name => (
        <Link href={`/pokemon/${name}`} key={name} className={styles.cardsGrid__item}>
          <PokemonDisplayCard id={name} width='100%' />
        </Link>
      ))}

      {wrapperEl?.clientHeight === wrapperEl?.scrollHeight ? (
        <button className={styles.cardsGrid__moreBtn} onClick={updateOffset} >
          Show More
        </button>
      ) : null }
    </div>
  );
}
