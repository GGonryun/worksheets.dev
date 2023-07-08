import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {
  Dialog,
  DialogContent,
  Typography,
  Link,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Emoji, OpenInNewTabLink } from '@worksheets/ui/common';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ListAltIcon from '@mui/icons-material/ListAltOutlined';
import { useRouter } from 'next/router';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import { useEffect, useState } from 'react';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { SpotlightButton } from './shared/spotlight-button';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';

const { DOCS_URL, APP_URL } = SERVER_SETTINGS.WEBSITES;
const actions = [
  { icon: <Emoji label="Get help" symbol={128640} />, name: 'Help' },
  { icon: <Emoji label="Contact us" symbol={128199} />, name: 'Contact' },
  { icon: <Emoji label="Welcome" symbol={128075} />, name: 'Welcome' },
];

export function SupportSpeedDial() {
  const theme = useTheme();
  const { push, query } = useRouter();
  const evaluation = query.evaluation === 'true';

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [openWelcomeDialog, setOpenWelcomeDialog] = useState(false);

  useEffect(() => {
    if (evaluation) {
      setOpenWelcomeDialog(true);
    }
  }, [evaluation]);

  const handleActionClick = (name: string) => {
    console.log('clicked');
    switch (name) {
      case 'Welcome':
        setOpenWelcomeDialog(true);
        break;
      case 'Contact':
        push(DOCS_URL('/contact-us'));
        break;
      case 'Help':
        push(DOCS_URL('/docs/faq'));
        break;
    }
  };

  return (
    <>
      <EvaluationDialog
        open={openWelcomeDialog}
        onClose={() => {
          setOpenWelcomeDialog(false);
        }}
      />
      <Backdrop open={openSpeedDial} sx={{ zIndex: 2000 }} />
      {!isMobile && (
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{
            position: 'absolute',
            bottom: 32,
            right: 32,
            zIndex: 2001,
          }}
          icon={<SpeedDialIcon />}
          onClick={() => setOpenSpeedDial((b) => !b)}
          open={openSpeedDial}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={(e) => {
                handleActionClick(action.name);
              }}
            />
          ))}
        </SpeedDial>
      )}
    </>
  );
}

const EvaluationDialog: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
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
            If you would like to <strong>increase your limits</strong>,{' '}
            <OpenInNewTabLink href={`${DOCS_URL('/contact-us')}`}>
              contact us
            </OpenInNewTabLink>
            .
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1.25} py={2}>
          <SpotlightButton
            elevation={8}
            label={'Learn about Worksheets.dev'}
            caption={
              'See how worksheets simplifies your multi-application workflows.'
            }
            icon={<AccountTreeOutlinedIcon />}
            href={`${DOCS_URL()}`}
            openInNewTab
          />
          <SpotlightButton
            elevation={8}
            label={'Automate your first task'}
            caption={
              'Learn more about writing and executing worksheets in less than 5 minutes.'
            }
            icon={<ListAltIcon />}
            href={`${DOCS_URL('/docs/tutorials/quick-start')}`}
            openInNewTab
          />
          <SpotlightButton
            elevation={8}
            label={'Join our community'}
            caption={
              'Stay up to date with the latest Worksheets.dev news and announcements'
            }
            icon={<PeopleOutlinedIcon />}
            href={`${DOCS_URL('/contact-us')}`}
            openInNewTab
          />
          <SpotlightButton
            elevation={8}
            label={'See your limits & quotas'}
            caption={
              'Learn more about your quotas and limits and how to increase them for free.'
            }
            icon={<MemoryOutlinedIcon />}
            href={`${APP_URL('/settings/billing')}`}
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
