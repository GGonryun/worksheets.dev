import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GameSubmission } from './game-submission';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { NewWindow } from '@worksheets/ui/icons';
import { BasicGameSubmission } from '../types';

export const GameSubmissions: React.FC<{
  submissions: BasicGameSubmission[];
}> = ({ submissions }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}
  >
    <Typography variant="h5">Your Submissions</Typography>
    <EmptySubmissionsPlaceholder visible={!submissions.length} />
    <Box
      sx={{
        display: submissions.length ? 'flex' : 'none',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      {submissions.map((submission) => (
        <GameSubmission key={submission.id} {...submission} />
      ))}
    </Box>
    <Button
      href="/submit/new"
      variant="contained"
      color="primary"
      startIcon={<AddIcon sx={{ mr: -0.5, mt: '-2px' }} />}
      sx={{
        borderRadius: 8,
        width: 'fit-content',
        px: 4,
        textTransform: 'none',
        fontFamily: (theme) => theme.typography.h6.fontFamily,
      }}
    >
      Submit New Game
    </Button>
    <Typography variant="body3">
      For more information on how to submit a game, please visit our{' '}
      <a href="/contribute#submit-a-game">contribution page</a>.
    </Typography>
  </Box>
);

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
    <NewWindow sx={{ fontSize: { xs: 64, sm: 72 } }} />
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
