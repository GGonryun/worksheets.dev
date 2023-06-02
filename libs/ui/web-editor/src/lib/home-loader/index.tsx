import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTimeout, warn } from '@worksheets/ui/common';
import { request, useUser } from '@worksheets/auth/client';
import { GetWorksheetsResponse } from '../../api/worksheets/get';
import { FC } from 'react';
import { PostWorksheetResponse } from '../../server';
export const HomeLoader: FC = () => {
  const { push } = useRouter();
  const { user } = useUser();
  const { data, isLoading } = request.query.usePrivate<GetWorksheetsResponse>(
    '/api/worksheets',
    user
  );
  const mutate = request.query.useMutate();
  const privateCommand = request.command.private(user);

  const numWorksheets = Object.keys(data ?? {}).length;
  useTimeout(() => {
    if (user && numWorksheets > 0) {
      const first = Object.values(data ?? {}).at(0);
      if (first) {
        push(`/ide/${first.id}`);
        return;
      }
    } else if (user) {
      // user has no worksheets setup, we'll create one for them.
      privateCommand<PostWorksheetResponse>('/api/worksheets', 'POST')
        .then((d) => {
          push(`/ide/${d}`);
          mutate('/api/worksheets');
        })
        .catch(warn(`failed to create new worksheet`));
    } else {
      push(`/ide`);
    }
  }, 1250);
  return (
    <Box>
      <Box>Loading Integrated Development Environment . . .</Box>
      {isLoading && <Box>Searching for user data . . .</Box>}
      <Box>Found {numWorksheets} worksheets . . .</Box>
    </Box>
  );
};
