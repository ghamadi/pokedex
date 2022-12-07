'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { PokemonTypeName, TYPE_TO_COLOR } from '~/src/constants';
import { capitalize } from '~/src/utils/string';

interface ChipProps {
  type: PokemonTypeName;
  children: ReactNode;
}

const Chip = styled.div<ChipProps>`
  height: 22px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ type }) => TYPE_TO_COLOR[type]};
`;

export default function PokemonTypeChip({ type }: { type: PokemonTypeName }) {
  return <Chip type={type}>{capitalize(type)}</Chip>;
}
