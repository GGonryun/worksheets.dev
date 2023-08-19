import { ApplicationDetailsPage } from '@worksheets/ui/worksheets';
import { useRouter } from 'next/router';

export default function Details() {
  const { query } = useRouter();
  const appId = query.appId as string;
  return <ApplicationDetailsPage appId={appId} resource="overview" />;
}
