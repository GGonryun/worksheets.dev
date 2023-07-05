import { formatTimestampLong } from '@worksheets/util/time';

type PointMetric = {
  type: string;
  time?: number;
  payload?: unknown;
};

type CountMetric = {
  type: string;
  quantity?: number;
  payload?: unknown;
};
export const metrics = {
  savePoint(point: PointMetric) {
    console.info(
      `[METRICS][${point.type}]: received point ${formatTimestampLong(
        point.time ?? Date.now()
      )}`,
      point.payload ?? {}
    );
  },

  increment(point: CountMetric) {
    console.info(
      `[METRICS][${point.type}]: increment by ${point.quantity ?? 1}`,
      point.payload ?? {}
    );
  },
};
