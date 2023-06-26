import { newApplication } from '@worksheets/apps/framework';
import { log } from './log';
import { now } from './now';
import { noop } from './noop';

export const sysCore = newApplication({
  id: 'sys',
  label: 'System Library',
  description: '',
  settings: null,
  methods: [log, now, noop],
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/paper-plane-svgrepo-com.svg',
});
