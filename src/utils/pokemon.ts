export function getMaxStat(statName: string, baseStat: number) {
  return Math.floor(
    statName.toUpperCase() === 'HP'
      ? (baseStat * 2) + 204
      : ((baseStat * 2) + 99) * 1.1
  );
}