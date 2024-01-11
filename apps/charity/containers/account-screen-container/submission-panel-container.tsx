import { trpc } from '@worksheets/trpc-charity';
import {
  BasicGameSubmission,
  SubmissionsPanel,
} from '@worksheets/ui/pages/account';
import { Snackbar, useSnackbar } from '@worksheets/ui/snackbar';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const SubmissionsPanelContainer: FC<{
  submissions: BasicGameSubmission[];
}> = ({ submissions }) => {
  const router = useRouter();
  const { data: rawTerms } = trpc.profile.terms.get.useQuery();
  const snackbar = useSnackbar();

  const approveTerms = trpc.profile.terms.approve.useMutation();
  const destroySubmission = trpc.game.submissions.destroy.useMutation();
  const utils = trpc.useUtils();

  const terms = rawTerms ?? {
    canApprove: false,
    hasApproved: false,
  };

  const onApproveTermsOfService = async () => {
    try {
      await approveTerms.mutateAsync();
      await utils.profile.terms.get.invalidate();
    } catch (error) {
      snackbar.trigger({
        message:
          'Failed to approve terms of service, please try again later. If this issue persists, please contact support.',
        severity: 'error',
      });
    }
  };

  const onDeleteSubmission = async (submissionId: string) => {
    try {
      await destroySubmission.mutateAsync({ submissionId });
      await utils.game.submissions.list.invalidate();

      router.reload();
    } catch {
      snackbar.trigger({
        message:
          'Failed to delete submission, please try again later. If this issue persists, please contact support.',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <SubmissionsPanel
        terms={terms}
        submissions={submissions}
        onApproveTermsOfService={onApproveTermsOfService}
        onDeleteSubmission={onDeleteSubmission}
      />
      <Snackbar {...snackbar} />
    </>
  );
};
