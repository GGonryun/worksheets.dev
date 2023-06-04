import { newApplication } from '@worksheets/apps/framework';
import { userGet } from './lib/user/get';
import { gistsListStarred } from './lib/gists/list/starred';
import { gistsListUser } from './lib/gists/list/user';
import { gistsCreate } from './lib/gists/create';
import { gistsDelete } from './lib/gists/delete';
import { gistsStar } from './lib/gists/star';
import { gistsUpdate } from './lib/gists/update';
import { webhooksCreate } from './lib/webhooks/create';
import { webhooksDelete } from './lib/webhooks/delete';
import { webhooksGet } from './lib/webhooks/get';
import { webhooksList } from './lib/webhooks/list';
import { webhooksPing } from './lib/webhooks/ping';
import { webhooksTest } from './lib/webhooks/test';

export default newApplication({
  label: 'GitHub',
  description: '',
  methods: [
    userGet,
    gistsListStarred,
    gistsListUser,
    gistsCreate,
    gistsDelete,
    gistsStar,
    gistsUpdate,
    webhooksCreate,
    webhooksDelete,
    webhooksGet,
    webhooksList,
    webhooksPing,
    webhooksTest,
  ],
});
