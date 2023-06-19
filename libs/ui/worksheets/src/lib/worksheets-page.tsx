import { Box, Button, Divider, Typography } from '@mui/material';
import Layout from './layout';
import AddIcon from '@mui/icons-material/AddOutlined';
import DataTable from './worksheets/data-grid';
import { useRouter } from 'next/router';
import { FilterTextInput } from './shared/filter-text-input';

export function WorksheetsPage() {
  const { push } = useRouter();

  return (
    <Layout>
      <Box paddingTop={1.25} paddingBottom={1} px={3} display="flex" gap={6}>
        <Typography variant="h6">Worksheets</Typography>
        <Button
          startIcon={<AddIcon />}
          size="small"
          onClick={() => push('/worksheets/create')}
        >
          Create
        </Button>
      </Box>
      <Divider />
      <FilterTextInput placeholder="Filter by name" />
      <Divider />
      <Box height="1000px">
        <DataTable />
      </Box>
    </Layout>
  );
}
