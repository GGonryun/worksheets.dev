import { Button, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import dynamic from 'next/dynamic';
import React from 'react';

import { DynamicQuest } from './dynamic-quest';

const Container: React.FC = () => {
  const quests = trpc.user.tasks.listQuests.useInfiniteQuery(
    {
      // TODO: this might overwhelm the server, lower the limit per page if needed
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor: 0,
    }
  );

  const [loading, setLoading] = React.useState(false);

  if (quests.isLoading) {
    return <LoadingBar />;
  }

  if (quests.isError) {
    return <ErrorComponent />;
  }

  const isEmpty = quests.data.pages.every((p) => p.items.length === 0);

  return (
    <Column gap={2}>
      <Column gap={1}>
        {isEmpty && (
          <Column alignItems="center">
            <Typography variant="h6">No quests found</Typography>
            <CharityGamesLogo size={128} />
          </Column>
        )}
        {quests.data.pages.map((quests) =>
          quests.items.map((quest) => (
            <DynamicQuest key={quest.questId} quest={quest} />
          ))
        )}
      </Column>
      {quests.hasNextPage && (
        <Button
          disabled={loading || !quests.hasNextPage}
          variant="arcade"
          color={'secondary'}
          onClick={async () => {
            try {
              setLoading(true);
              await quests.fetchNextPage();
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </Column>
  );
};

export const DynamicQuests = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingBar />,
});
