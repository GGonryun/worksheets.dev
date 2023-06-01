import { newApplication } from '@worksheets/apps/framework';
import { sendEmail } from './lib/sendEmail';
import { getUserEmail } from './lib/getUserEmail';

export default newApplication({
  label: 'Gmail',
  description: '',
  methods: [sendEmail, getUserEmail],
});
