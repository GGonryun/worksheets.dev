import { newApplication } from '@worksheets/apps/framework';
import { listEvents } from './lib/listEvents';

export default newApplication({
  label: 'Google Calendar',
  description: '',
  methods: [listEvents],
});
