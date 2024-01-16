import AddIcon from '@mui/icons-material/Add';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';

import NewWindowIcon from '../icons/new-window';
import { PanelHeader } from '../panel-header';
import { BasicGameSubmission } from '../types';
import { GameSubmission } from './game-submission';

export const GameSubmissions: React.FC<{
  submissions: BasicGameSubmission[];
  onDelete: (id: string) => void;
}> = ({ submissions, onDelete }) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <PanelHeader primary="Game Submissions" />
      <EmptySubmissionsPlaceholder visible={!submissions.length} />
      <Box
        sx={{
          display: submissions.length ? 'flex' : 'none',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {submissions.map((submission) => (
          <GameSubmission
            key={submission.id}
            {...submission}
            onDelete={() => onDelete(submission.id)}
          />
        ))}
      </Box>
      <Button
        href="/submit/new"
        onClick={() => setLoading(true)}
        variant="contained"
        color="success"
        startIcon={
          loading ? (
            <CircularProgress color="white" size="1rem" />
          ) : (
            <AddIcon sx={{ mr: -0.5, mt: '-2px' }} />
          )
        }
        sx={{
          borderRadius: 8,
          width: 'fit-content',
          px: 4,
          textTransform: 'none',
          fontFamily: (theme) => theme.typography.h6.fontFamily,
        }}
      >
        {loading ? 'Loading...' : 'Submit New Game'}
      </Button>
      <Typography variant="body3">
        For more information on how to submit a game, please visit our{' '}
        <a href="/contribute#submit-a-game">contribution page</a>.
      </Typography>
    </Box>
  );
};

const EmptySubmissionsPlaceholder: React.FC<{ visible: boolean }> = ({
  visible,
}) => (
  <Box
    sx={{
      display: visible ? 'flex' : 'none',
      alignItems: { xs: 'flex-start', sm: 'center' },
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 3,
      pb: 1,
    }}
  >
    <NewWindowIcon sx={{ fontSize: { xs: 64, sm: 72 } }} />
    <Box>
      <Typography
        variant="h5"
        fontSize={{
          xs: '1.15rem',
          sm: '1.25rem',
        }}
      >
        No submissions found
      </Typography>
      <Typography
        variant="body2"
        fontSize={{
          xs: '0.75rem',
          sm: '0.875rem',
        }}
      >
        You have not submitted any games yet.
        <br />
        Click below to get started.
      </Typography>
    </Box>
  </Box>
);
