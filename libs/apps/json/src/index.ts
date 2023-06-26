import { newApplication } from '@worksheets/apps/framework';
import { stringify } from './lib/stringify';
import { parse } from './lib/parse';
import { query } from './lib/query';

export default newApplication({
  label: 'JSON',
  description: 'JavaScript Object Notation',
  methods: [stringify, parse, query],
  id: 'json',
  logo: '',
  settings: null,
});
