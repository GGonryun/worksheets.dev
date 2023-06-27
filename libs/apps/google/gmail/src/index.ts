import { newApplication } from '@worksheets/apps/framework';
import { sendEmail } from './lib/sendEmail';
import { getUserEmail } from './lib/getUserEmail';
import { settings } from './lib/common';

export default newApplication({
  id: 'google-gmail',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
  label: 'Gmail',
  description: '',
  methods: [sendEmail, getUserEmail],
  settings,
});
