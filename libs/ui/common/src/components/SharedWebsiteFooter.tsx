import { Link, Typography, Divider } from '@mui/material';
import { TinyLogo, TinyButton } from '@worksheets/ui-basic-style';
import { useLayout } from '../hooks';
import { urls } from '../lib/urls';
import { Flex } from '@worksheets/ui-core';

const currentYear = new Date().getFullYear();

export const SharedWebsiteFooter = () => {
  const { isMobile } = useLayout();
  return (
    <Flex column={isMobile} gap={3} pb={2}>
      <Link color="inherit" underline="hover" href="/">
        <Flex gap={0.5}>
          <TinyLogo borderless src="/logo.svg" area={28} />
          <Typography variant="body2">Worksheets.dev</Typography>
        </Flex>
      </Link>
      {!isMobile && <Divider orientation="vertical" sx={{ height: 32 }} />}
      <Flex spaceBetween fullWidth>
        <Typography display="flex" gap={2} variant="body2">
          <Link color="inherit" underline="hover" href="/privacy">
            Privacy
          </Link>
          <Link color="inherit" underline="hover" href="/terms">
            Terms
          </Link>
        </Typography>
        <Flex gap={2} wrap flexDirection="row-reverse">
          {!isMobile && (
            <TinyButton href={urls.app.login} size="small">
              Sign Up
            </TinyButton>
          )}
          <TinyButton
            variant="contained"
            size="small"
            sx={{
              px: 3,
            }}
            href={urls.app.contact}
          >
            Contact Us
          </TinyButton>

          <Typography variant="body2">
            © {currentYear} Worksheets Inc.
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};
