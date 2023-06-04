import { newApplication } from '@worksheets/apps/framework';
import { listFiles } from './lib/listFiles';

export default newApplication({
  label: 'Dropbox',
  description: '',
  methods: [listFiles],
});
