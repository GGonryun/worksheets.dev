import { ExecutionOverviewPage } from '@worksheets/ui/worksheets';
import { useRouter } from 'next/router';

export default function ExecutionDetails() {
  const { query } = useRouter();
  const worksheetId = query.id as string;
  const executionId = query.executionId as string;
  return (
    <ExecutionOverviewPage
      worksheetId={worksheetId}
      executionId={executionId}
    />
  );
}
