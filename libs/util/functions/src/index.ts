export const once = (fn: () => void) => {
  let called = false;
  return () => {
    if (called) return;
    called = true;
    fn();
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const lucky = <T extends Function>(chance: number, callback: T) => {
  if (chance < 1 || chance > 100) {
    throw new Error('Chance must be an integer between 1 and 100 inclusive');
  }
  return (x: number, y: number) => {
    // calculate luck between 1 and 100 inclusive
    const luck = Math.ceil(Math.random() * 100);
    if (luck > chance) return;

    callback(x, y);
  };
};
