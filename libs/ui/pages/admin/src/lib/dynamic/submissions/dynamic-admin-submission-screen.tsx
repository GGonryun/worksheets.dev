import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { printShortDateTime } from '@worksheets/util/time';
import dynamic from 'next/dynamic';
import React from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { DataPair } from '../../shared/data-pair';
import { ListButton } from '../../shared/list-button';

const AdminSubmissionScreen: React.FC<{ submissionId: string }> = ({
  submissionId,
}) => {
  const submission = trpc.admin.submissions.find.useQuery({
    submissionId,
  });

  if (submission.isLoading) return <LoadingScreen />;
  if (submission.error)
    return <ErrorScreen message={submission.error.message} />;

  return (
    <CustomContainer>
      <ListButton href={routes.admin.submissions.path()}>
        All Submissions
      </ListButton>
      <CustomPaper title={`Game Submission Details`}>
        <DataPair label="Submission ID" value={submission.data.submissionId} />
        <DataPair
          label="User ID"
          value={submission.data.userId}
          href={routes.admin.user.path({
            params: {
              userId: submission.data.userId,
            },
          })}
        />
        <DataPair label="Slug" value={submission.data.slug} />
        <DataPair label="Title" value={submission.data.title} />
        <DataPair label="Headline" value={submission.data.headline} />
        <DataPair label="Description" value={submission.data.description} />
        <DataPair label="Instructions" value={submission.data.instructions} />
        <DataPair label="Project Type" value={submission.data.projectType} />
        <DataPair
          label="Categories"
          value={submission.data.categories.join(', ')}
        />
        <DataPair
          label="Updated At"
          value={printShortDateTime(submission.data.updatedAt)}
        />

        <DataPair
          label="Created At"
          value={printShortDateTime(submission.data.createdAt)}
        />
      </CustomPaper>
    </CustomContainer>
  );
};

export const DynamicAdminSubmissionScreen = dynamic(
  () => Promise.resolve(AdminSubmissionScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
