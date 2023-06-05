import { newApplication } from '@worksheets/apps/framework';
import { stringify } from './lib/stringify';
import { parse } from './lib/parse';

export default newApplication({
  label: 'JSON',
  description: '',
  methods: [stringify, parse],
});
