import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Link,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddOutlined';
import { WorksheetsDataTable } from './data-table';
import { PageLayout } from '../page-layout';
import { OpenInNewTabLink } from '@worksheets/ui/common';
import { SpotlightButton } from '../applications-gallery/page';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ListAltIcon from '@mui/icons-material/ListAltOutlined';
import ScannerIcon from '@mui/icons-material/ScannerOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import { useRouter } from 'next/router';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

export function WorksheetsPage() {
  const { push, query } = useRouter();
  const evaluation = query.evaluation === 'true';
  const onClose = () => {
    push('/worksheets');
  };
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
      <EvaluationDialog open={evaluation} onClose={onClose} />
      <WorksheetsDataTable />
      <Divider />
    </PageLayout>
  );
}

const EvaluationDialog: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5">
            Hello!{' '}
            <span role="img" aria-label="hello">
              👋
            </span>{' '}
            Welcome to <Link>Worksheets.dev</Link>
          </Typography>

          <Typography variant="h6">
            We are currently in <u>evaluation mode</u>.
          </Typography>
          <Typography variant="body1">
            Rate limits have been increased and user quotas have been decreased.
            If you would like to <strong>continue using Worksheets.dev</strong>,
            please{' '}
            <OpenInNewTabLink href="https://docs.worksheets.dev/settings/billing">
              contact us
            </OpenInNewTabLink>
            .
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1} py={2}>
          <SpotlightButton
            elevation={8}
            label={'Learn about Worksheets.dev'}
            caption={
              'See how worksheets simplifies your multi-application workflows.'
            }
            icon={<AccountTreeOutlinedIcon />}
            href="/docs/overview"
            openInNewTab
          />
          <SpotlightButton
            elevation={8}
            label={'Automate your first task'}
            caption={
              'Learn more about writing and executing worksheets in less than 5 minutes.'
            }
            icon={<ListAltIcon />}
            href="/docs/tutorials/execute-a-worksheet"
            openInNewTab
          />
          <SpotlightButton
            elevation={8}
            label={'Execute an application method'}
            caption={
              'Gain free instant access to our application registry through our developer API.'
            }
            icon={<AppsIcon />}
            href="/docs/tutorials/execute-a-method"
            openInNewTab
          />
          <SpotlightButton
            elevation={8}
            label={'Join our community'}
            caption={
              'Stay up to date with the latest Worksheets.dev news and announcements'
            }
            icon={<PeopleOutlinedIcon />}
            href="/docs/community"
            openInNewTab
          />
          <SpotlightButton
            elevation={8}
            label={'Increase your limits'}
            caption={
              'Learn more about your quotas and limits and how to increase them for free.'
            }
            icon={<MemoryOutlinedIcon />}
            href="/settings/billing"
            openInNewTab
          />
          <SpotlightButton
            elevation={8}
            label={'Browse premade templates'}
            caption={
              'Discover new workflows. Browse through our library of premade templates.'
            }
            icon={<ScannerIcon />}
            href="/templates"
            openInNewTab
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            onClose();
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
