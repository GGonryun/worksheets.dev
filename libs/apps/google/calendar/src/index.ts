import { newApplication } from '@worksheets/apps/framework';
import { listEvents } from './lib/listEvents';
import { settings } from './lib/common';

export default newApplication({
  id: 'google.calendar',
  label: 'Google Calendar',
  description: '',
  methods: [listEvents],
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/Google_Calendar_icon.svg',
  settings,
  meta: {
    enabled: true,
    public: true,
    gallery: true,
    external: true,
  },
});
