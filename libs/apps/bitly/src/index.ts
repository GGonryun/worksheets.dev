import { newApplication } from '@worksheets/apps/framework';
import { linksCreate } from './lib/links/create';
import { groupsList } from './lib/groups/list';
import { linksQR } from './lib/links/qr';
import { linksDelete } from './lib/links/delete';
import { linksGet } from './lib/links/get';

export default newApplication({
  label: 'Bitly',
  description: '',
  methods: [linksCreate, linksQR, linksDelete, linksGet, groupsList],
});
