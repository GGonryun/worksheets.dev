import { ServiceDetailsPage } from '@worksheets/ui/worksheets';
import { useRouter } from 'next/router';

export default function Page() {
  const { query } = useRouter();
  const serviceId = query.serviceId as string;
  return <ServiceDetailsPage serviceId={serviceId} />;
}
