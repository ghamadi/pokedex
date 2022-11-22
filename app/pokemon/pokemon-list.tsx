'use client';

import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { PokemonApiResponse } from '../../poke-api-types';
import { getPokemon, getPokemonSpeciesList } from '../../src/api/spcies';

interface QueryData {
  pokemonList: PokemonApiResponse[];
  hasNext: boolean;
}

async function getPokemonList(offset: number) {
  let { next, results: speciesNamedResources } = (await getPokemonSpeciesList(offset, 40));
  let pokemonList = (await Promise.all(speciesNamedResources.map(({ name }) => getPokemon(`${process.env.NEXT_PUBLIC_POKE_API_POKEMON}/${name}`))));

  return { pokemonList, hasNext: next !== null };
}

export default function PokemonSpeciesList({ species }: { species: PokemonApiResponse[] }) {
  let { data, hasNextPage, fetchNextPage } = useInfiniteQuery<QueryData>(
    'pokemonList',
    async ({ pageParam = 1 }) => (await getPokemonList((pageParam - 1) * 40)),
    {
      initialData: species ? { pageParams: [undefined], pages: [{ pokemonList: species, hasNext: true }] } : undefined,
      getNextPageParam: (lastPage, allPages) => lastPage.hasNext ? allPages.length + 1 : undefined
    }
  );

  useEffect(() => {
    let fetching = false;
    async function onScroll() {
      let element = document.scrollingElement;
      if (element) {
        let { scrollHeight, scrollTop, clientHeight } = element;
        if (!fetching && scrollHeight - scrollTop <= clientHeight) {
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
    <div style={{ width: '50%', margin: 'auto' }}>
      {data?.pages.map(({ pokemonList }, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
          {pokemonList.map(({ id, name, sprites }) => (
            <div key={id} style={{ border: '1px solid', borderRadius: 5, padding: 5, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p>id: {id}</p>
                <p>name: {name}</p>
              </div>

              <img src={sprites.other['official-artwork'].front_default} alt='sprite' height={'120px'} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
