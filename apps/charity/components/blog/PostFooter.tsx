import { Box, TextField } from '@mui/material';
import { FC } from 'react';
import { CaptionText, SmallHeaderText } from '../Typography';
import { SubmissionButton } from '../Buttons';
import { Flex } from '@worksheets/ui-core';

export type PostFooterProps = {
  // empty
};

export const PostFooter: FC = () => {
  return (
    <Box
      sx={{
        mt: 5,
        p: 3,
        border: (theme) => `1px solid ${theme.palette.grey[600]}`,
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <SmallHeaderText>Join our newsletter</SmallHeaderText>
      <CaptionText>
        Subscribe to our newsletter to receive the latest news. No spam. No ads.
        Just good stuff.
      </CaptionText>
      <Flex fullWidth column gap={2} pt={3}>
        <TextField
          id="newsletter-join-email"
          fullWidth
          placeholder="Enter Your Email"
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: 'white',
          }}
        />
        <SubmissionButton
          fullWidth
          onClick={() =>
            alert(
              "Thanks for your interest, but we're currently working on this feature!"
            )
          }
        >
          Subscribe
        </SubmissionButton>
      </Flex>
    </Box>
  );
};
