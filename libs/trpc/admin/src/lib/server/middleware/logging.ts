import { prettyPrintMilliseconds } from '@worksheets/util/time';
import { middleware } from '../trpc';

// improve the monitor metadata required for logging.
export const monitor = middleware(
  async ({ meta, rawInput, path, type, next }) => {
    if (!meta?.logging) return await next();

    const header = `[${path}][${type}]`;
    const start = Date.now();

    console.info(`${header}[REQ]`, rawInput);

    const result = await next();

    const end = `${prettyPrintMilliseconds(Date.now() - start)}`;
    if (result.ok) {
      console.info(`${header}[RES][${end}][OK]`, result.data);
    } else {
      console.error(`${header}[RES][${end}][ERR]`, result.error);
    }

    return result;
  }
);
