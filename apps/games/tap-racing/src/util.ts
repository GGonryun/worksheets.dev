export const padScore = (ms: number) => {
  return (ms / 1000).toFixed(2).padStart(5, '0');
};
