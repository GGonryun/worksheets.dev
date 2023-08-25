import {
  useMediaQuery,
  Box,
  Typography,
  Button,
  Link,
  useTheme,
} from '@mui/material';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { Flex } from '@worksheets/ui/common';

export const ApplicationsFooter: React.FC<{
  app: { title: string };
}> = ({ app }) => {
  // use media query and set smaller padding if screen is small
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      width="100%"
      px={isMobile ? 4 : 12}
      py={isMobile ? 4 : 6}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Box>
        <Typography variant="h5" fontWeight={900}>
          Ready to get started?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The {app.title} API is free to try for 30 days. No credit card
          required.
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
    </Box>
  );
};
