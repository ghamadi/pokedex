'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { PokemonApiResponse } from '~/poke-api-types';
import { getPokemon } from '~/src/api/pokemon';
import { usePokemon } from '~/src/hooks/usePokemon';

interface QueryData {
  pokemonList: PokemonApiResponse[];
  hasNext: boolean;
}

export default function PokemonList({ pokemon }: { pokemon: PokemonApiResponse[] }) {
  let { namedResources } = usePokemon();

  let { data, hasNextPage, fetchNextPage } = useInfiniteQuery<QueryData>(
    'pokemonList',
    async ({ pageParam = 1 }) => (await getPokemonDetailedList((pageParam - 1) * 40)),
    {
      initialData: pokemon.length ? { pageParams: [undefined], pages: [{ pokemonList: pokemon, hasNext: true }] } : undefined,
      getNextPageParam: (lastPage, allPages) => lastPage.hasNext ? allPages.length + 1 : undefined
    }
  );

  async function getPokemonDetailedList(offset: number) {
    console.log(offset, namedResources.length);
    let pokemonList = (await Promise.all(namedResources.slice(offset, offset + 40).map(({ url }) => getPokemon(url))));
    return { pokemonList, hasNext: offset < namedResources.length };
  }

  useEffect(() => {
    let fetching = false;

    async function onScroll() {
      let element = document.scrollingElement;
      if (element) {
        let { scrollHeight, scrollTop, clientHeight } = element;
        if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
          if (hasNextPage) {
            fetching = true;
            await fetchNextPage();
            fetching = false;
          }
        }
      }
    }

    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [fetchNextPage, hasNextPage]);

  return (
    <div style={{ width: '500px', margin: 'auto' }}>
      {data?.pages.map(({ pokemonList }, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
          {pokemonList.map(({ id, name, sprites }) => (
            <Link href={`/pokemon/${name}`} key={id} style={{ border: '1px solid', borderRadius: 5, padding: 5, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p>id: {id}</p>
                <p>name: {name}</p>
              </div>

              <img src={sprites.other['official-artwork'].front_default} alt='sprite' height={'120px'} />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
