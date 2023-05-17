import { request } from '@worksheets/apps/http';
import { avg, calc, identity, max, min } from '@worksheets/apps/math';
import { log, now } from '@worksheets/apps/sys';

export function registry() {
  return {
    http: { request },
    math: { avg, calc, identity, max, min },
    sys: { log, now },
  };
}
