import { Box, CircularProgress, TextField } from '@mui/material';
import { FC } from 'react';
import { CaptionText, SmallHeaderText } from './Typography';
import { SubmissionButton } from './Buttons';
import { Flex } from '@worksheets/ui-core';
import { useSubscribeEmail } from '../hooks/useSubscribeEmail';

export const JoinNewsletterBox: FC = () => {
  const {
    email,
    error,
    success,
    isLoading,
    setEmail,
    subscribeEmail,
    keyboardSubscribeEmail,
  } = useSubscribeEmail();

  return (
    <Box>
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
          disabled={isLoading}
          value={email}
          onChange={setEmail}
          onKeyDown={keyboardSubscribeEmail}
        />
        <SubmissionButton
          fullWidth
          disabled={isLoading || !!success || !!error}
          onClick={subscribeEmail}
        >
          {isLoading ? <CircularProgress /> : 'Subscribe'}
        </SubmissionButton>
        {success && (
          <CaptionText
            sx={{
              color: (theme) => theme.palette.success.main,
            }}
          >
            {success}
          </CaptionText>
        )}
        {error && (
          <CaptionText
            sx={{
              color: (theme) => theme.palette.error.main,
            }}
          >
            {error}
          </CaptionText>
        )}
      </Flex>
    </Box>
  );
};
