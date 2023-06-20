import { ConnectionsPage } from '@worksheets/ui/worksheets';
import { useRouter } from 'next/router';
export default function Page() {
  const { query } = useRouter();
  return <ConnectionsPage connectionId={query.id?.toString()} />;
}
