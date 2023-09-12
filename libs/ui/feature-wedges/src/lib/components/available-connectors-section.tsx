import { Box, Link, Paper, Typography, useTheme } from '@mui/material';
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
export const AvailableConnectorsSection: FC<AvailableServicesSectionProps> = ({
  backgroundColor,
}) => {
  const urls = useProjectUrls();
  const { theme } = useLayout();

  const { data: connectors } = trpc.vault.connectors.list.useQuery();

  const [search, setSearch] = useState('');

  const filtered =
    connectors?.filter((connector) =>
      connector.title.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  return (
    <SectionLayout backgroundColor={backgroundColor}>
      <Paper variant="outlined" sx={{ p: 3, width: '100%' }}>
        <Flex column gap={3} pb={1}>
          <HeaderSection
            title={'What apps are supported?'}
            subtitle={
              "Browse our growing selection of app connectors, we're adding more every day!"
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
              {filtered.map((connector) => (
                <Flex key={connector.appId} centered>
                  <ConnectorIcon
                    src={connector.logo}
                    label={connector.title}
                    href={urls.app.application(connector.appId)}
                  />
                </Flex>
              ))}
              <Flex centered>
                <ConnectorIcon
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
          <Link href="/contact">Request a new application</Link>
        </Typography>
      </Paper>
    </SectionLayout>
  );
};

const ConnectorIcon: FC<{
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
    </Box>
  );
};
