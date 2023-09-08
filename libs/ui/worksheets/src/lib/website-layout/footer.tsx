import {
  BookOutlined,
  OpenInNew,
  Diversity3,
  ScienceOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Link,
  Paper,
  Typography,
  lighten,
  styled,
} from '@mui/material';
import { TinyButton } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { SharedWebsiteFooter, urls, useLayout } from '@worksheets/ui/common';
import Image from 'next/image';
import Grid from '@mui/material/Unstable_Grid2';

const CustomBox = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'isTablet',
})<ButtonProps & { isTablet?: boolean }>(({ theme, color, isTablet }) => {
  const selectedColor =
    color === 'warning'
      ? theme.palette.warning.main
      : color === 'secondary'
      ? theme.palette.secondary.main
      : color === 'success'
      ? theme.palette.success.main
      : theme.palette.primary.main;

  return {
    borderRadius: 0,
    padding: theme.spacing(3),
    textTransform: 'none',
    color: theme.palette.text.primary,
    fontSize: isTablet
      ? theme.typography.body2.fontSize
      : theme.typography.body1.fontSize,
    fontWeight: 900,
    backgroundColor: lighten(selectedColor, 0.7),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: lighten(selectedColor, 0.5),
      textDecoration: 'underline',
    },
  };
});

export type WebsiteFooterProps = {
  withMarketing?: boolean;
};
export function WebsiteFooter({ withMarketing }: WebsiteFooterProps) {
  return (
    <Flex column fullWidth>
      <Divider />
      {withMarketing && <EarlyAccessProgramSection />}
      <SupportButtonsSection />
      <Paper elevation={0} sx={{ p: 3 }}>
        <SharedWebsiteFooter />
      </Paper>
    </Flex>
  );
}

const EarlyAccessProgramSection = () => {
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

const SupportButtonsSection = () => {
  const { isTablet } = useLayout();
  return (
    <Grid container minHeight={isTablet ? 60 : 80}>
      <Grid xs={4} border={'1px solid'}>
        <CustomBox
          color="success"
          href={urls.app.contact}
          startIcon={<BookOutlined />}
          isTablet={isTablet}
        >
          Read the docs
        </CustomBox>
      </Grid>
      <Grid xs={4} borderTop={'1px solid'} borderBottom={'1px solid'}>
        <CustomBox
          color="primary"
          href={urls.app.contact}
          startIcon={<ScienceOutlined />}
          isTablet={isTablet}
        >
          Find an expert
        </CustomBox>
      </Grid>
      <Grid xs={4} border={'1px solid'}>
        <CustomBox
          color="secondary"
          href={urls.app.contact}
          startIcon={<Diversity3 />}
          isTablet={isTablet}
        >
          Ask the community
        </CustomBox>
      </Grid>
    </Grid>
  );
};
