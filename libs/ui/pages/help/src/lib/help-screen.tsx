import { KeyboardBackspace } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Questions } from '@worksheets/ui/components/qa-section';
import { GradientTypography } from '@worksheets/ui/components/typography';
import { UnderConstruction } from '@worksheets/ui/pages/under-construction';
import { useBookmark } from '@worksheets/ui-core';
import { QuestionAnswer } from '@worksheets/util/types';
import { FC } from 'react';

export type HelpScreenProps = {
  title: string;
  description: string;
  qa: QuestionAnswer[];
};

export const HelpScreen: FC<HelpScreenProps> = ({ title, description, qa }) => {
  const bookmark = useBookmark();

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Button
          variant="arcade"
          color="warning"
          size="small"
          startIcon={<KeyboardBackspace />}
          href={routes.help.path()}
          sx={{
            width: 'fit-content',
            mb: { xs: 3, sm: 6 },
          }}
        >
          Back to Help Center
        </Button>
        <GradientTypography
          component="h1"
          typography={{ xs: 'h5', sm: 'h4', md: 'h3' }}
          background={(theme) =>
            theme.palette.text.marketing.gradients.blue.dark
          }
        >
          {title}
        </GradientTypography>
        <Typography
          component="h2"
          typography={{ xs: 'body2', sm: 'body1' }}
          color={'text.blue.dark'}
          fontWeight={{ xs: 500, sm: 500, md: 500 }}
        >
          {description}
        </Typography>
        <Box my={{ xs: 3, sm: 6 }}>
          {qa.length ? (
            <Questions qa={qa} bookmark={bookmark} />
          ) : (
            <Box mt={8}>
              <UnderConstruction />
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
