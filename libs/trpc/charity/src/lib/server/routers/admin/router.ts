import { t } from '../../trpc';
import codes from './codes';
import games from './games';
import prizes from './prizes';
import raffles from './raffles';
import reports from './reports';
import submissions from './submissions';
import users from './users';
import winners from './winners';

export default t.router({
  codes,
  games,
  prizes,
  raffles,
  reports,
  submissions,
  users,
  winners,
});
