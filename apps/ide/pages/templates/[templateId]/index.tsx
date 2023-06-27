import { TemplateDetailsPage } from '@worksheets/ui/worksheets';
import { useRouter } from 'next/router';

export default function Page() {
  const { query } = useRouter();
  const templateId = query.templateId as string;
  return <TemplateDetailsPage templateId={templateId} />;
}
