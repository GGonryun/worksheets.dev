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
  useLayout,
} from '@worksheets/ui/common';
import { useRouter } from 'next/router';
import { useProjectUrls } from '@worksheets/ui-projects';
import { ApplicationBasics } from '@worksheets/schemas-applications';
import { BoxedApplicationButton } from './boxed-app-button';

type AvailableServicesSectionProps = {
  backgroundColor: BackgroundColors;
};
export const AvailableServicesSection: FC<AvailableServicesSectionProps> = ({
  backgroundColor,
}) => {
  const urls = useProjectUrls();
  const { theme } = useLayout();

  const { data: services } = trpc.services.list.useQuery();

  const [search, setSearch] = useState('');

  const filtered =
    services?.filter((service) =>
      service.title.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  return (
    <SectionLayout backgroundColor={backgroundColor}>
      <Paper variant="outlined" sx={{ p: 3, width: '100%' }}>
        <Flex column gap={3} pb={1}>
          <HeaderSection
            title={'What services do you support?'}
            subtitle={
              "Browse our growing selection of Unified Service APIs, we're adding more every day!"
            }
          />
          <TinyTextField
            value={search}
            icon={<Search />}
            fullWidth
            placeholder="Search for a service"
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
              {filtered.map((service) => (
                <Flex key={service.id} centered>
                  <ServiceIcon
                    src={service.logo}
                    label={service.title}
                    providers={service.providers}
                    endpoints={service.endpoints}
                    href={urls.app.project.service(service.id)}
                  />
                </Flex>
              ))}
              <Flex centered>
                <ServiceIcon
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
          <Link href="/contact">Request a new Service</Link>
        </Typography>
      </Paper>
    </SectionLayout>
  );
};

const ServiceIcon: FC<{
  src: string;
  label: string;
  endpoints?: string[];
  providers?: ApplicationBasics[];
  href: string;
}> = ({ src, label, href, endpoints, providers }) => {
  const theme = useTheme();
  const { push } = useRouter();

  return (
    <Box position="relative">
      <Tooltip
        title={
          <ServiceHoverDescription
            endpoints={endpoints}
            providers={providers}
          />
        }
        placement={'right'}
        disableHoverListener={!endpoints?.length && !providers?.length}
      >
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
    </Box>
  );
};

const ServiceHoverDescription: FC<{
  endpoints?: string[];
  providers?: ApplicationBasics[];
}> = ({ endpoints, providers }) => {
  return (
    <Flex column minWidth={100} gap={2}>
      <Flex column gap={0.5}>
        <Typography variant="body2" pb={1}>
          <u>Supported Providers</u>
        </Typography>
        {providers?.map((provider) => (
          <Flex gap={0.5} pl={1}>
            <TinyLogo
              src={provider.logo}
              area={24}
              sx={(theme) => ({
                backgroundColor: selectBackground(theme, 'white'),
              })}
            />
            <Typography key={provider.id} variant="caption">
              - {provider.name}
            </Typography>
          </Flex>
        ))}
      </Flex>
      <Flex column gap={0.5}>
        <Typography variant="body2">
          <u>Supported Functions</u>
        </Typography>
        {endpoints?.map((endpoint) => (
          <Typography pl={1} key={endpoint} variant="caption">
            - {endpoint}
          </Typography>
        ))}
      </Flex>
    </Flex>
  );
};
