import { ErrorScreen } from '@worksheets/ui/pages/errors';

export default async function Page() {
  return (
    <ErrorScreen
      title="404"
      header="Not Found"
      message="This page could not be found. If the problem persists, please contact us."
    />
  );
}
