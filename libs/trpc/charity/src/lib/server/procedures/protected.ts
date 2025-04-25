import {
  apiOnly,
  authentication,
  teamMembership,
} from '../middleware/authentication';
import { t } from '../trpc';

export const protectedProcedure = t.procedure.use(authentication);
export const protectedTeamProcedure = t.procedure.use(teamMembership);
export const protectedApiProcedure = t.procedure.use(apiOnly);
