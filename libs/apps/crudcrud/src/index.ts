import { newApplication } from '@worksheets/apps/framework';
import { create } from './lib/create';
import { read } from './lib/read';
import { update } from './lib/update';
import { del } from './lib/delete';
import { settings } from './lib/common';

export default newApplication({
  label: 'CrudCrud',
  description: '',
  methods: [create, read, update, del],
  id: 'crudcrud',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/language-json-svgrepo-com.svg',
  settings,
});
