import { trpc } from '@worksheets/trpc-charity';
import {
  BasicGameSubmission,
  SubmissionsPanel,
} from '@worksheets/ui/pages/account';
import { FC } from 'react';

export const SubmissionsPanelContainer: FC<{
  submissions: BasicGameSubmission[];
}> = ({ submissions }) => {
  const { data: terms } = trpc.profile.terms.get.useQuery();

  const approveTerms = trpc.profile.terms.approve.useMutation();
  const utils = trpc.useUtils();

  const handleApproveTerms = async () => {
    await approveTerms.mutateAsync();
    await utils.profile.terms.get.invalidate();
  };

  return (
    <SubmissionsPanel
      terms={
        terms ?? {
          canApprove: false,
          hasApproved: false,
        }
      }
      submissions={submissions}
      onApproveTermsOfService={handleApproveTerms}
    />
  );
};
