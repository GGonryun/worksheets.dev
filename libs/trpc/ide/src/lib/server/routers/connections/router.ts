import { t } from '../../trpc';
import deleteConnectionField from './deleteConnectionField';
import getForm from './getForm';
import getOAuthUrl from './getOAuthUrl';
import dataTable from './dataTable';
import submitForm from './submitForm';
import destroyConnection from './delete';
import worksheets from './worksheets/router';
export default t.router({
  getForm,
  getOAuthUrl,
  deleteConnectionField,
  dataTable,
  delete: destroyConnection,
  submitForm,
  worksheets,
});