import { trpc } from '@worksheets/trpc-charity';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useRouter } from 'next/router';

import { SubmissionsPanel } from '../panels';

export const SubmissionsPanelContainer: React.FC = () => {
  const router = useRouter();
  const snackbar = useSnackbar();

  const submissions = trpc.user.game.submissions.list.useQuery();
  const terms = trpc.user.profile.terms.get.useQuery();

  const approveTerms = trpc.user.profile.terms.approve.useMutation();
  const destroySubmission = trpc.user.game.submissions.destroy.useMutation();

  const onApproveTermsOfService = async () => {
    try {
      await approveTerms.mutateAsync();
      await terms.refetch();
    } catch (error) {
      snackbar.error(
        'Failed to approve terms of service, please try again later. If this issue persists, please contact support.'
      );
    }
  };

  const onDeleteSubmission = async (submissionId: string) => {
    try {
      await destroySubmission.mutateAsync({ submissionId });
      await submissions.refetch();

      router.reload();
    } catch {
      snackbar.error(
        'Failed to delete submission, please try again later. If this issue persists, please contact support.'
      );
    }
  };

  if (terms.isLoading || submissions.isLoading) {
    return <LoadingScreen />;
  }

  if (terms.error || submissions.error) {
    return <div>error</div>;
  }

  return (
    <SubmissionsPanel
      terms={terms.data}
      submissions={submissions.data}
      onApproveTermsOfService={onApproveTermsOfService}
      onDeleteSubmission={onDeleteSubmission}
    />
  );
};
