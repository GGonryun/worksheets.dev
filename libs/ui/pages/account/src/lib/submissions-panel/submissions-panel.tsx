import Box from '@mui/material/Box';
import { GettingStarted } from './getting-started';
import { GameSubmissions } from './game-submissions';
import { TermsApproval } from '@worksheets/util/types';
import { BasicGameSubmission } from '../types';
import React from 'react';
import { ConfirmDeletionModal } from './confirm-deletion-modal';

export const SubmissionsPanel: React.FC<{
  terms: TermsApproval;
  submissions: BasicGameSubmission[];
  onApproveTermsOfService: () => Promise<void>;
  onDeleteSubmission: (id: string) => Promise<void>;
}> = ({ terms, submissions, onApproveTermsOfService, onDeleteSubmission }) => {
  const [requestDelete, setRequestDelete] = React.useState<string | undefined>(
    undefined
  );
  return (
    <>
      <Box>
        {!terms.hasApproved ? (
          <GettingStarted
            onSubmit={onApproveTermsOfService}
            canSubmit={terms.canApprove}
          />
        ) : (
          <GameSubmissions
            submissions={submissions}
            onDelete={(id) => setRequestDelete(id)}
          />
        )}
      </Box>

      <ConfirmDeletionModal
        submission={submissions.find((s) => s.id === requestDelete)}
        onCancel={() => setRequestDelete(undefined)}
        onConfirm={async () => {
          if (!requestDelete) return;

          await onDeleteSubmission(requestDelete);
          setRequestDelete(undefined);
        }}
      />
    </>
  );
};
