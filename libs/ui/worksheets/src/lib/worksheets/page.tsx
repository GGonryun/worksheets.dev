import { Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/AddOutlined';
import { WorksheetsDataTable } from './data-table';
import { useRouter } from 'next/router';
import { FilterTextInput } from '../shared/filter-text-input';
import { PageLayout } from '../page-layout';

export function WorksheetsPage() {
  const { push } = useRouter();

  return (
    <PageLayout
      title={'Worksheets'}
      primary={{
        children: 'Create',
        startIcon: <AddIcon />,
        size: 'small',
        onClick() {
          push('/worksheets/create');
        },
      }}
    >
      <FilterTextInput placeholder="Filter by name" />
      <Divider />
      <WorksheetsDataTable />
    </PageLayout>
  );
}
