export function formatId(id: number) {
  let paddedId = `${id}`.padStart(4, '0');
  return `#${paddedId}`;
}

export function capitalize(str: string) {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}

export function formatPokemonName(name: string) {
  return name.split('-').map(_name => capitalize(_name)).join(' ');
}