import { now, log } from '@worksheets/apps/sys';

export default function Console() {
  return (
    <>
      Common Apps: {now.module} {log.module}
    </>
  );
}
