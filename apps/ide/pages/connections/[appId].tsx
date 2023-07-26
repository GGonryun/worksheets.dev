import { ConnectionsPage } from '@worksheets/ui/worksheets';
import { useRouter } from 'next/router';
export default function Page() {
  const { query } = useRouter();
  const appId = query.appId as string;
  return <ConnectionsPage appId={appId} />;
}
