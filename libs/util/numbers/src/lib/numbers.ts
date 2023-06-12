/**
 * @name randomBetween
 * @param min the minimum value exclusive
 * @param max the maximum value inclusive
 * @returns a random number between the min and max values provided
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
