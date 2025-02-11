'use client';

import { ErrorScreen } from '@worksheets/ui/pages/errors';

export default function Page() {
  return (
    <ErrorScreen
      title="500"
      header="Internal Server Error"
      message="Something unexpected happened on our end and our team has been notified. If the problem persists, please contact us."
    />
  );
}
