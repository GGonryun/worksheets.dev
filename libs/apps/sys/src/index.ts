import { newApplication } from '@worksheets/apps/framework';
import { log } from './lib/log';
import { noop } from './lib/noop';
import { now } from './lib/now';
import { flags } from './lib/flags';
import { tokens } from './lib/tokens';

export default newApplication({
  label: 'sys',
  description: '',
  methods: [log, now, noop, flags, tokens],
});
