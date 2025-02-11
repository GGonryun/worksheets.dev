import { HelpCenterScreen } from '@worksheets/ui/pages/help';
import { Boundary } from '@worksheets/ui/suspense/server';

export default async function Page() {
  return (
    <Boundary>
      <HelpCenterScreen />
    </Boundary>
  );
}
