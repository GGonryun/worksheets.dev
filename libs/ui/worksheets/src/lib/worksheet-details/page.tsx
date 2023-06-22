import WebsiteLayout from '../website-layout';
import { useRouter } from 'next/router';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { WorksheetTabs } from './tabs';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { trpc } from '@worksheets/trpc/ide';

export const WorksheetDetailsPage: React.FC<{ tab: number }> = ({ tab }) => {
  const { query, push } = useRouter();
  const worksheetId = query.id as string;
  const { data: worksheet } = trpc.worksheets.get.useQuery(
    { id: worksheetId },
    { enabled: !!worksheetId }
  );
  const deleteWorksheet = trpc.worksheets.delete.useMutation();

  const handleDeleteWorksheet = async () => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        "This will also delete your worksheet's execution history and logs. Are you sure?"
      )
    ) {
      await deleteWorksheet.mutateAsync({ id: worksheetId });
      push('/worksheets');
    }
  };

  return (
    <WebsiteLayout>
      <Box height="100%" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" gap={3} margin={1}>
          <IconButton onClick={() => push('/worksheets')}>
            <ArrowBackIcon color="primary" />
          </IconButton>
          <Typography variant="h6">Worksheet details</Typography>
        </Box>
        <Divider />
        <Box mx={3} my={1} display="flex" gap={3} alignItems="center">
          <Typography variant="h6">{worksheet?.name ?? ''}</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              size="small"
              startIcon={<EditOutlinedIcon />}
              sx={{ fontWeight: 900 }}
              href={`/worksheets/${query.id}/worksheet`}
            >
              Edit
            </Button>
            <Button
              size="small"
              startIcon={<PlayArrowOutlinedIcon />}
              href={`/worksheets/${query.id}/execute`}
              sx={{ fontWeight: 900 }}
            >
              Execute
            </Button>
            <Button
              size="small"
              startIcon={<DeleteOutlineOutlinedIcon />}
              onClick={handleDeleteWorksheet}
              sx={{ fontWeight: 900 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
        <Divider />
        <WorksheetTabs value={tab} worksheetId={worksheetId} />
      </Box>
    </WebsiteLayout>
  );
};
