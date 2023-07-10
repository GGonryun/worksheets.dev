import { newApplication } from '@worksheets/apps/framework';
import { sendEmail } from './lib/sendEmail';
import { getUserEmail } from './lib/getUserEmail';
import { settings } from './lib/common';

export default newApplication({
  id: 'gmail',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
  label: 'Gmail',
  description:
    'Gmail is a free email service provided by Google. As of 2019, it had 1.5 billion active users worldwide making it the largest email service in the world.',
  methods: [sendEmail, getUserEmail],
  settings,
  meta: {
    enabled: true,
    public: true,
    gallery: true,
    external: true,
  },
});
