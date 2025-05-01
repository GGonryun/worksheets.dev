import { MemberPermission } from '@worksheets/util/team';

import {
  apiOnly,
  authentication,
  teamMembership,
} from '../middleware/authentication';
import { t } from '../trpc';

export const protectedProcedure = t.procedure.use(authentication);
export const protectedTeamProcedure = (permission: MemberPermission[]) =>
  t.procedure.use(teamMembership(permission));
export const protectedApiProcedure = t.procedure.use(apiOnly);
