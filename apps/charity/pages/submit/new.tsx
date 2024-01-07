// when creating a new game submission, temporarily store the game in the database with a status of DRAFT and then redirect the user to the edit page for that game.
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { AbsolutelyCentered } from '@worksheets/ui-core';

type Props = {
  submissionId: string;
};

const Page: NextPageWithLayout<Props> = (props) => {
  // TODO: implement this page
  return (
    <AbsolutelyCentered>
      <Box
        sx={{
          mt: -12,
          p: 3,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <CircularProgress
          size="large"
          color="success"
          sx={{
            height: { xs: 75, sm: 100 },
            width: { xs: 75, sm: 100 },
          }}
        />
        <Box py={3} />
        <Typography variant="h5" textAlign="center">
          We&apos;re creating your game submission.
        </Typography>
      </Box>
    </AbsolutelyCentered>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
