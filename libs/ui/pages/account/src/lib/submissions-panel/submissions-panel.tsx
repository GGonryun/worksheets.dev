import Box from '@mui/material/Box';
import { GettingStarted } from './getting-started';
import { GameSubmissions } from './game-submissions';
import { TermsApproval } from '@worksheets/util/types';
import { BasicGameSubmission } from '../types';

export const SubmissionsPanel: React.FC<{
  terms: TermsApproval;
  submissions: BasicGameSubmission[];
  onApproveTermsOfService: () => void;
}> = ({ terms, submissions, onApproveTermsOfService }) => (
  <Box>
    {!terms.hasApproved ? (
      <GettingStarted
        onSubmit={onApproveTermsOfService}
        canSubmit={terms.canApprove}
      />
    ) : (
      <GameSubmissions submissions={submissions} />
    )}
  </Box>
);
