import { trpc } from '@worksheets/trpc-charity';
import { SubmissionsPanel } from '@worksheets/ui/pages/account';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { Snackbar, useSnackbar } from '@worksheets/ui/snackbar';
import { useRouter } from 'next/router';

export const SubmissionsPanelContainer: React.FC = () => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();

  const submissions = trpc.game.submissions.list.useQuery();
  const terms = trpc.user.profile.terms.get.useQuery();

  const approveTerms = trpc.user.profile.terms.approve.useMutation();
  const destroySubmission = trpc.game.submissions.destroy.useMutation();

  const onApproveTermsOfService = async () => {
    try {
      await approveTerms.mutateAsync();
      await utils.user.profile.terms.get.invalidate();
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

  if (terms.isLoading || submissions.isLoading) {
    return <LoadingScreen />;
  }

  if (terms.error || submissions.error) {
    return <div>error</div>;
  }

  return (
    <>
      <SubmissionsPanel
        terms={terms.data}
        submissions={submissions.data}
        onApproveTermsOfService={onApproveTermsOfService}
        onDeleteSubmission={onDeleteSubmission}
      />
      <Snackbar {...snackbar} />
    </>
  );
};
