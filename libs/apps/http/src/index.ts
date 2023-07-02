import { newApplication } from '@worksheets/apps/framework';
import { request } from './lib/request';

export default newApplication({
  id: 'http',
  label: 'HTTP',
  description: 'Supports http requests',
  methods: [request],
  logo: '',
  settings: null,
});
