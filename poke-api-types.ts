export interface NamedApiResource {
  name: string;
  url: string;
}

export interface Sprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
}

export interface PokemonAbility {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  slot: number;
  type: NamedApiResource;
}

export interface PokemonColor {
  id: number;
  name: string;
  pokemon_species: NamedApiResource[];
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  weight: number;
  height: number;
  abilities: PokemonAbility[];
  species: NamedApiResource;
  sprites: Sprites;
  stats: PokemonStat[];
  types: PokemonType[];
}

export interface PokemonSpeciesApiResponse {
  id: number;
  name: string;
  color: NamedApiResource;
}

export interface ListApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
}