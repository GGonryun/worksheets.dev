import { Box, Link, Paper, Tooltip, Typography, useTheme } from '@mui/material';
import { HeaderSection } from './header-section';
import { SectionLayout } from './section-layout';
import { Flex } from '@worksheets/ui-core';
import { TinyLogo, TinyTextField } from '@worksheets/ui-basic-style';
import { Search } from '@mui/icons-material';
import { trpc } from '@worksheets/trpc/ide';
import { FC, useState } from 'react';
import {
  BackgroundColors,
  selectBackground,
  urls,
  useLayout,
} from '@worksheets/ui/common';
import { useRouter } from 'next/router';
import { BoxedApplicationButton } from './boxed-app-button';

export const AvailableApplicationsSection: FC<{
  backgroundColor: BackgroundColors;
}> = () => {
  const { theme } = useLayout();

  const { data: apps } = trpc.applications.list.useQuery({});

  const [search, setSearch] = useState('');

  const filtered = apps?.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SectionLayout backgroundColor="secondary">
      <Paper variant="outlined" sx={{ p: 3, width: '100%' }}>
        <Flex column gap={3} pb={1}>
          <HeaderSection
            title={'What apps do you support?'}
            subtitle={
              "Here's our current catalogue of **applications**, we're adding more every day."
            }
          />
          <TinyTextField
            value={search}
            icon={<Search />}
            fullWidth
            placeholder="Search for an application"
            onChange={(v) => setSearch(v)}
          />
          <Box
            sx={{
              p: 3,
              maxHeight: 180,
              overflow: 'scroll',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: `${theme.shape.borderRadius * 1}px`,
            }}
          >
            <Flex wrap gap={3} centered>
              {filtered?.map((app) => (
                <Flex key={app.id} centered>
                  <ApplicationIcon
                    src={app.logo}
                    label={app.name}
                    href={urls.app.application(app.id)}
                  />
                </Flex>
              ))}
              <Flex centered>
                <ApplicationIcon
                  src={'/art/create-new.svg'}
                  label={'Request'}
                  href="/contact"
                />
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <Typography variant="caption">
          Couldn't find what you are looking for?{' '}
          <Link href="/contact">Request a new app</Link>
        </Typography>
      </Paper>
    </SectionLayout>
  );
};

const ApplicationIcon: FC<{ src: string; label: string; href: string }> = ({
  src,
  label,
  href,
}) => {
  const theme = useTheme();
  const { push } = useRouter();

  return (
    <Tooltip title={label} disableHoverListener={label.length < 9}>
      <span>
        <BoxedApplicationButton
          disableRipple
          LinkComponent={Link}
          onClick={() => {
            push(href);
          }}
        >
          <Flex column centered gap={0.75}>
            <Flex
              id="application-icon-box"
              centered
              sx={{
                backgroundColor: selectBackground(theme, 'grey'),
                width: 72,
                height: 72,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <TinyLogo
                src={src}
                area={32}
                sx={{
                  p: 1,
                  backgroundColor: selectBackground(theme, 'white'),
                  borderRadius: `${theme.shape.borderRadius * 1}px`,
                }}
              />
            </Flex>
            <Typography
              variant="caption"
              sx={{
                width: '80px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {label}
            </Typography>
          </Flex>
        </BoxedApplicationButton>
      </span>
    </Tooltip>
  );
};
