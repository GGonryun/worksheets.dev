import { Box, Typography, Link, Paper } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex, Spacing } from '@worksheets/ui-core';
import { urls } from '../lib';
import { useLayout } from '../hooks';
import { FC } from 'react';

export const UnderConstructionNotice: FC = () => {
  const { isMobile } = useLayout();
  return (
    <Paper
      variant="outlined"
      sx={{
        maxWidth: 800,
        m: 3,
      }}
    >
      <Spacing all={isMobile ? 3 : 6}>
        <Flex gap={4}>
          <TinyLogo
            borderless
            area={isMobile ? 100 : 200}
            src={`/art/construction.svg`}
            label="Under Construction Notice"
          />

          <Box>
            <Typography variant="h5" fontWeight={900}>
              Under Construction
            </Typography>
            <Typography variant="body1" color="text.secondary" component="span">
              We alerted our team that you're interested in this feature. We
              prioritize our roadmap based on customer feedback.
            </Typography>
            <Spacing top={2} />
            <Link underline="hover" href={urls.app.subscribe}>
              Sign up for our newsletter
            </Link>
            <Typography variant="body1" color="text.secondary" component="span">
              {' '}
              and we'll let you know when this feature is ready.
            </Typography>

            <Box pt={2}>
              <Typography variant="caption" color="text.secondary">
                We use <u>FullStory</u> to improve your experience on our
                website.{' '}
                <Link
                  underline="hover"
                  href={urls.app.application('fullstory')}
                >
                  Learn more.
                </Link>
              </Typography>
            </Box>
          </Box>
        </Flex>
      </Spacing>
    </Paper>
  );
};
