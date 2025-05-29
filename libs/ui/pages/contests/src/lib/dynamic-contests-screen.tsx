import { PlayCircleOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  ContainerProps,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import {
  ArcadeItemGroup,
  ArcadeItemLayout,
} from '@worksheets/ui/components/arcade';
import { Description } from '@worksheets/ui/components/description';
import { Row } from '@worksheets/ui/components/flex';
import { helpPrizes } from '@worksheets/ui/components/help';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { Questions } from '@worksheets/ui/components/qa-section';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { isExpired, printTimeRemaining } from '@worksheets/util/time';
import { ContestSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { JSXElementConstructor, ReactNode } from 'react';

export const TitleText = () => {
  return (
    <CustomPaper
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        width: 'fit-content',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          color="text.arcade"
          sx={{
            typography: { xs: 'body2', sm: 'body1' },
            fontWeight: { xs: 500, sm: 500 },
          }}
        >
          Win free prizes!
        </Typography>
        <Typography
          component="h1"
          color="text.arcade"
          textAlign="center"
          sx={{
            typography: { xs: 'h4', sm: 'h3', md: 'h2' },
          }}
        >
          Contests & Competitions
        </Typography>
        <Row
          sx={{
            mt: { xs: 2, sm: 4 },
            mb: { xs: 1, sm: 2 },
            alignSelf: 'center',
            gap: 2,
            flexWrap: 'wrap',
            '& > a': {
              width: { xs: '100%', sm: '256px' },
            },
          }}
        >
          <Button
            size="large"
            variant="arcade"
            color="success"
            startIcon={<PlayCircleOutline />}
            href={routes.help.prizes.path()}
          >
            How It Works
          </Button>
        </Row>
      </Box>
    </CustomPaper>
  );
};

export const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 4,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

export const CustomContainer = styled<JSXElementConstructor<ContainerProps>>(
  (props) => <Container maxWidth="lg" {...props} />
)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const Contest: React.FC<ContestSchema> = ({
  id,
  game: { title, thumbnail },
  endAt,
}) => {
  const expired = endAt < Date.now();

  return (
    <ArcadeItemLayout
      href={routes.contest.path({ params: { contestId: id } })}
      imageUrl={thumbnail}
      name={title}
      caption={expired ? 'Contest Over' : `${printTimeRemaining(endAt)} left`}
    />
  );
};

const ContestGroup: React.FC<{
  title: ReactNode;
  contests?: ContestSchema[];
  empty?: ReactNode;
  action?: ReactNode;
}> = ({ title, action, contests, empty }) => {
  return (
    <ArcadeItemGroup
      title={title}
      action={action}
      empty={empty}
      items={contests}
      render={(item) => <Contest key={item.id} {...item} />}
      placeholder={<LoadingBar />}
    />
  );
};

export const ContestContents: React.FC<{
  list: ContestSchema[];
}> = ({ list }) => {
  return <ContestGroup title={'Contests'} contests={list} />;
};

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
