import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
  Typography,
} from '@mui/material';
import { FC, Fragment, ReactNode, useState } from 'react';
import { ApplicationSelectionFormHeader } from './header';
import { Flex } from '@worksheets/ui-core';
import {
  ApplicationTag,
  ListApplicationsResponse,
} from '@worksheets/schemas-applications';
import {
  Clear,
  ContactSupport,
  CreditCardOffOutlined,
  NewReleases,
  SearchOutlined,
  Star,
  TrendingUp,
} from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  TinyLogo,
  TinyToggle,
  TinyTextField,
} from '@worksheets/ui-basic-style';

export const ApplicationSelectionForm: FC<{
  applications: ListApplicationsResponse;
  onSelectApp: (appId: string) => void;
  onClose: () => void;
}> = ({ applications, onSelectApp, onClose }) => {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState<string>('');
  // simple filter using the search string
  const filteredApplications = applications
    ?.filter((app) => app.name.toLowerCase().includes(search.toLowerCase()))
    .filter((app) => {
      if (tag !== '') {
        return app.tags.includes(tag as ApplicationTag);
      }
      return true;
    });

  const handleClearFilters = () => {
    setSearch('');
    setTag('');
  };

  const hasFilters = !!tag || !!search;

  return (
    <Flex column p={3} gap={3}>
      <ApplicationSelectionFormHeader onClose={onClose} />
      <Flex column gap={1}>
        <Flex column>
          <Flex gap={0.5}>
            <Typography variant="body1" fontWeight={900}>
              Applications
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ({applications?.length ?? 0})
            </Typography>
          </Flex>
          <Typography variant="body2" color="text.secondary">
            Browse all applications available in the gallery.
          </Typography>
        </Flex>
        <TinyTextField
          fullWidth
          icon={<SearchOutlined />}
          placeholder="Filter by name"
          value={search}
          onChange={setSearch}
        />
        <Flex spaceBetween>
          <TagFilters
            active={tag}
            setActive={(a) => setTag((t) => (a === t ? '' : a))}
          />
          <TinyToggle
            disabled={!hasFilters}
            checked={hasFilters}
            onClick={handleClearFilters}
            startIcon={<Clear />}
            color="inherit"
          >
            Clear
          </TinyToggle>
        </Flex>
      </Flex>
      <ApplicationGrid
        applications={filteredApplications}
        onSelectApp={onSelectApp}
      />
    </Flex>
  );
};

// TODO: reduce duplication in this component
const TagFilters: FC<{
  active?: string;
  setActive: (tag: string) => void;
}> = ({ active, setActive }) => {
  return (
    <Flex gap={1} wrap>
      <TinyToggle
        startIcon={<Star />}
        color="secondary"
        checked={active === 'featured'}
        onClick={() => setActive('featured')}
      >
        Featured
      </TinyToggle>
      <TinyToggle
        startIcon={<TrendingUp />}
        color="primary"
        checked={active === 'popular'}
        onClick={() => setActive('popular')}
      >
        Popular
      </TinyToggle>
      <TinyToggle
        startIcon={<NewReleases />}
        color="warning"
        checked={active === 'new'}
        onClick={() => setActive('new')}
      >
        New
      </TinyToggle>
      <TinyToggle
        startIcon={<CreditCardOffOutlined />}
        color="success"
        checked={active === 'free'}
        onClick={() => setActive('free')}
      >
        Free
      </TinyToggle>
    </Flex>
  );
};

export const ApplicationGrid: FC<{
  applications: ListApplicationsResponse;
  onSelectApp: (appId: string) => void;
}> = ({ applications, onSelectApp }) => (
  <Grid container spacing={2}>
    <Grid xs={4}>
      <RequestApplicationCard />
    </Grid>
    {applications.map((app) => (
      <Grid xs={4} key={app.id}>
        <ApplicationSelectionCard
          text={app.name}
          logo={app.logo}
          tooltip={app.name.length > 12 ? app.name : undefined}
          onSelect={() => onSelectApp(app.id)}
          icon={AppTagIcon(app.tags)}
        />
      </Grid>
    ))}
    <Grid xs={4}>
      <GetHelpCard />
    </Grid>
  </Grid>
);

const AppTagIcon = (tags: ApplicationTag[]) => {
  const icons: ReactNode[] = [];
  if (tags.includes('free')) {
    icons.push(<CreditCardOffOutlined fontSize="small" color="success" />);
  }
  if (tags.includes('featured')) {
    icons.push(<Star fontSize="small" color="secondary" />);
  }
  if (tags.includes('popular')) {
    icons.push(<TrendingUp fontSize="small" color="primary" />);
  }
  if (tags.includes('new')) {
    icons.push(<NewReleases fontSize="small" color="warning" />);
  }

  return icons.length ? (
    <Flex gap={0.5}>
      {icons.map((icon, index) => (
        <Fragment key={index}>{icon}</Fragment>
      ))}
    </Flex>
  ) : undefined;
};

export const ApplicationSelectionCard: FC<{
  text: string;
  logo: string;
  tooltip?: string;
  onSelect: () => void;
  icon?: React.ReactNode;
}> = ({ tooltip, onSelect, icon, text, logo }) => {
  return (
    <Card variant="outlined" sx={{ position: 'relative' }}>
      {icon && (
        <Box position="absolute" top={4} right={4}>
          {icon}
        </Box>
      )}
      <CardActionArea onClick={() => onSelect()} sx={{ height: 140 }}>
        <Tooltip
          title={tooltip}
          placement="top"
          disableHoverListener={!tooltip}
        >
          <CardContent>
            <Flex column gap={2} alignItems="center">
              <TinyLogo borderless area={48} src={logo} />

              <Typography
                variant="body2"
                fontWeight={900}
                textAlign="center"
                sx={{
                  height: 20,
                  maxWidth: 120,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {text}
              </Typography>
            </Flex>
          </CardContent>
        </Tooltip>
      </CardActionArea>
    </Card>
  );
};

const RequestApplicationCard: FC = () => (
  <ApplicationSelectionCard
    text={'Request App'}
    logo={'/art/create-new.svg'}
    tooltip={'Request a new application to be added to the gallery'}
    onSelect={() => alert('TODO: redirect to request application')}
    icon={<ContactSupport fontSize="small" color="primary" />}
  />
);

const GetHelpCard = () => (
  <ApplicationSelectionCard
    text={'Need help?'}
    logo={'/art/person-reading-a-book-question-mark.svg'}
    tooltip={'Contact us for help finding an application'}
    onSelect={() => alert('TODO: redirect to get help')}
    icon={<ContactSupport fontSize="small" color="primary" />}
  />
);
