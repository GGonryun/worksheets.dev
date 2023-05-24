import { newApplication } from '@worksheets/apps/framework';
import { query } from './lib/query';

export default newApplication({
  label: 'JSON',
  description: '',
  methods: [query],
});
