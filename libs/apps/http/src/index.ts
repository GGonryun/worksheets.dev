import { newApplication } from '@worksheets/apps/framework';
import { request } from './lib/request';

export default newApplication({
  label: 'http',
  description: '',
  methods: [request],
  id: 'http',
  logo: '',
  settings: null,
});
