import { t } from '../../trpc';
import codes from './codes';
import destroy from './delete';
import game from './game/router';
import gamePlay from './gamePlay/router';
import games from './games/router';
import get from './get';
import initialize from './initialize';
import integrations from './integrations/router';
import invitations from './invitations/router';
import leaderboards from './leaderboards/router';
import profile from './profile/router';
import raffles from './raffles/router';
import referrals from './referrals/router';
import referrer from './referrer/router';
import tasks from './tasks/router';
import teams from './teams/router';

export default t.router({
  referrals,
  referrer,
  gamePlay,
  profile,
  leaderboards,
  invitations,
  games,
  get,
  raffles,
  game,
  initialize,
  tasks,
  delete: destroy,
  codes,
  integrations,
  teams,
});
