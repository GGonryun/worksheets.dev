import { Box, Typography, Button, Link, TextField } from '@mui/material';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { TinyButton, TinyLogo } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { urls, useLayout, useUser } from '@worksheets/ui/common';

export const ApplicationsFooter: React.FC<{
  app: { title: string };
}> = ({ app }) => {
  const { isMobile } = useLayout();
  const { user } = useUser();

  return (
    <Flex
      py={isMobile ? 2 : 4}
      sx={(theme) => ({
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      })}
      centered
    >
      {user ? (
        <NewsletterCallToAction app={app} />
      ) : (
        <SignUpCallToAction app={app} />
      )}
    </Flex>
  );
};

const NewsletterCallToAction: React.FC<{
  app: { title: string };
}> = ({ app }) => {
  return (
    <Box px={3}>
      <Flex centered p={3} gap={5}>
        <Flex column maxWidth={400}>
          <Typography variant="h5" fontWeight={900}>
            Get the latest {app.title} news
          </Typography>
          <Typography variant="body2" color={'text.secondary'}>
            We'll send tips and tricks to help you get the most out of{' '}
            {app.title} and Worksheets. No spam, ever.
          </Typography>
          <Flex pt={3} gap={1}>
            <TextField size="small" placeholder="email address" />
            <TinyButton variant="contained" href={urls.app.contact}>
              Subscribe
            </TinyButton>
          </Flex>
        </Flex>
        <TinyLogo
          src="/art/supporting-business-people.svg"
          area={164}
          borderless
        />
      </Flex>
    </Box>
  );
};

const SignUpCallToAction: React.FC<{
  app: { title: string };
}> = ({ app }) => {
  const { isMobile } = useLayout();

  return (
    <Box>
      <Typography variant="h5" fontWeight={900}>
        Ready to get started?
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The {app.title} API is free to try for 30 days. No credit card required.
      </Typography>
      <Flex pt={2} gap={2}>
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? 'small' : 'medium'}
        >
          Sign Up
        </Button>
        <Typography variant="body2">
          <Link href={SERVER_SETTINGS.WEBSITES.DOCS_URL()}>
            Learn more about Worksheets
          </Link>
        </Typography>
      </Flex>
    </Box>
  );
};
