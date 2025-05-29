import { Box, Container } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { helpPrizes } from '@worksheets/ui/components/help';
import { Questions } from '@worksheets/ui/components/qa-section';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { isExpired } from '@worksheets/util/time';
import { ContestSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';

import { ContestContents } from './contest-contents';
import { CustomContainer } from './custom-container';
import { TitleText } from './title-text';

export const ContestsScreen: React.FC<{
  list: ContestSchema[];
}> = ({ list }) => (
  <>
    <CustomContainer>
      <TitleText />
      <Box
        width="100%"
        display="flex"
        gap={{ xs: 4, sm: 4, md: 6 }}
        flexDirection="column"
        alignItems="center"
      >
        <ContestContents list={list.filter((l) => isExpired(l.endAt))} />
      </Box>
    </CustomContainer>
    <Container
      maxWidth="lg"
      sx={{
        mb: 4,
      }}
    >
      <Description
        title="Frequently Asked Questions"
        color="secondary"
        description={
          <Box mt={{ xs: 3, sm: 4 }}>
            <Questions qa={helpPrizes} />
          </Box>
        }
      />
    </Container>
  </>
);

const ContestsScreenContainer: React.FC = () => {
  const list = trpc.public.contests.list.useQuery({
    includeExpired: false,
  });

  if (list.isPending) return <LoadingScreen />;
  if (list.isError) return <ErrorScreen />;

  return <ContestsScreen list={list.data} />;
};

export const DynamicContestsScreen = dynamic(
  () => Promise.resolve(ContestsScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
