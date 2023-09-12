import { OpenInNew } from '@mui/icons-material';
import { Paper, Typography, Link, Box } from '@mui/material';
import { TinyButton } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { useLayout, urls } from '@worksheets/ui/common';
import Image from 'next/image';

export const EarlyAccessProgramSection = () => {
  const { isMobile, isTablet } = useLayout();
  return (
    <Paper sx={{ px: 4, py: 2 }} elevation={0}>
      <Flex gap={isMobile ? 4 : 6} centered>
        <Image
          src="/art/person-who-explains-investment.svg"
          width={isMobile ? 180 : isTablet ? 210 : 240}
          height={isMobile ? 180 : isTablet ? 210 : 240}
          alt="Early access program"
        />
        <Flex column grow maxWidth={600}>
          <Typography variant="h6">
            <b>Become a beta tester</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We are currently in early access. By opting in, you'll gain
            unlimited access to the platform for free and get to work directly
            with our product team to shape the future of{' '}
            <Link href={urls.app.home} color="inherit">
              Worksheets.dev
            </Link>
            .
          </Typography>
          <Box pt={2} pb={4}>
            <TinyButton
              size="small"
              variant="contained"
              href={urls.app.earlyAccess}
              target="_blank"
              endIcon={<OpenInNew fontSize="small" sx={{ ml: 1 }} />}
            >
              Join the early access program
            </TinyButton>
          </Box>
          <Typography variant="caption">
            By joining the early access program, you agree to our{' '}
            <Link href="#">terms of service</Link> and{' '}
            <Link href="#">privacy policy</Link>.
          </Typography>
        </Flex>
      </Flex>
    </Paper>
  );
};
