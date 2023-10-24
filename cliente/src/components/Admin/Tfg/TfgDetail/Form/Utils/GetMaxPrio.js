export const GetMaxPrio = (misTFGs) => {
  if (misTFGs) {
    const maxPrios = Math.max(...misTFGs.map((p) => p.Priority));
    return misTFGs.filter((p) => p.Priority === maxPrios)[0].Priority;
  }
  return null;
};