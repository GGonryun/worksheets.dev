import { newApplication } from '@worksheets/apps/framework';
import { getFile } from './lib/get-file';
import { listFiles } from './lib/list-files';

export default newApplication({
  label: 'Google Drive',
  description:
    'Create and share your work online and access your documents from anywhere. Manage documents, spreadsheets, presentations, surveys, and more all in one easy place',
  methods: [getFile, listFiles],
});
