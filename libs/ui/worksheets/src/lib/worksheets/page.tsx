import { Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/AddOutlined';
import { WorksheetsDataTable } from './data-table';
import { PageLayout } from '../page-layout';
import { useRouter } from 'next/router';

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
      <WorksheetsDataTable />
      <Divider />
    </PageLayout>
  );
}
