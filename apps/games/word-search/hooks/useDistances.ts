import { Registry } from '@worksheets/ui-games';
import { Point } from 'framer-motion';

export const useDistances = (registry: Registry) => {
  const calculateDistances = (point: Point): Record<number, number> => {
    // calculate the distance from the point to each of the rectangles centers.
    const distances: Record<number, number> = {};
    Object.entries(registry).forEach(([index, rect]) => {
      const distance = Math.sqrt(
        Math.pow(point.x - rect.center.x, 2) +
          Math.pow(point.y - rect.center.y, 2)
      );
      distances[parseInt(index)] = distance;
    });
    return distances;
  };

  const closestNeighbors = (point: Point): number[] => {
    const distances = calculateDistances(point);
    const sorted = Object.entries(distances)
      .sort((a, b) => a[1] - b[1])
      .map(([index]) => parseInt(index));

    return sorted;
  };

  const detectIntersection = (point: Point): number => {
    return closestNeighbors(point)[0];
  };

  return { detectIntersection, closestNeighbors };
};
