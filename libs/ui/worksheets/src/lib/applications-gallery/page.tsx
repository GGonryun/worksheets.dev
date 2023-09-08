import { trpc } from '@worksheets/trpc/ide';
import Grid from '@mui/material/Unstable_Grid2';
import { ApplicationCard } from './application-card';
import { HorizontalSpreadLayout } from '../shared/horizontal-spread-layout';
import { ApplicationsHeader } from './applications-header';
import { ApplicationsFooter } from './applications-footer';
import { Flex } from '@worksheets/ui-core';
import { Collapse, Paper, Tooltip, Typography } from '@mui/material';
import {
  ApplicationCategory,
  ApplicationTag,
  ListApplicationsResponse,
} from '@worksheets/schemas-applications';
import { FC, ReactNode, useState } from 'react';
import { TinyToggle, TinyTextField } from '@worksheets/ui-basic-style';
import {
  FilterAlt,
  FilterAltOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { LinkButton } from '../shared/link-button';
import { SortMenuButton, SortOrder } from './sort-order-button';
import { useLayout } from '@worksheets/ui/common';

export function ApplicationsGalleryPage() {
  const { data: applications } = trpc.applications.list.useQuery({
    gallery: true,
  });

  return (
    <HorizontalSpreadLayout
      header={<ApplicationsHeader />}
      body={<ApplicationsBody applications={applications ?? []} />}
      footer={<ApplicationsFooter app={{ title: 'Worksheets Application' }} />}
    />
  );
}

export const ApplicationsBody: FC<{
  applications: ListApplicationsResponse;
}> = ({ applications }) => {
  const defaultSortOrder = SortOrder.AZ;
  const defaultCategories = Object.keys(
    filterFalse(defaultCategoryFilters)
  ) as ApplicationCategory[];
  const defaultTags = Object.keys(
    filterFalse(defaultTagFilters)
  ) as ApplicationTag[];

  const [searchText, setSearchText] = useState('');
  const [tagFilters, setTagFilters] = useState(defaultTags);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [categoryFilters, setCategoryFilters] = useState(defaultCategories);

  const handleFilterChange = (opts: Partial<ApplicationFilterData>) => {
    if (opts.searchText != null) setSearchText(opts.searchText);
    if (opts.tags != null) setTagFilters(opts.tags);
    if (opts.categories != null) setCategoryFilters(opts.categories);
    if (opts.sortOrder != null) setSortOrder(opts.sortOrder);
  };

  const handleFilterReset = () => {
    setSearchText('');
    setCategoryFilters(defaultCategories);
    setTagFilters(defaultTags);
    setSortOrder(defaultSortOrder);
  };

  const filteredApplications = applyFilters({
    searchText,
    tags: tagFilters,
    categories: categoryFilters,
    sortOrder,
  })(applications);

  const hasFilters = Boolean(
    searchText ||
      tagFilters.length !== defaultTags.length ||
      categoryFilters.length !== defaultCategories.length ||
      sortOrder !== defaultSortOrder
  );

  return (
    <Flex column gap={3} py={3}>
      <ApplicationsFilterSection
        applications={filteredApplications}
        onChange={handleFilterChange}
        onReset={handleFilterReset}
        data={{
          searchText,
          tags: tagFilters,
          categories: categoryFilters,
          sortOrder,
          hasChanges: hasFilters,
        }}
      />
      <ApplicationsGrid applications={filteredApplications} />
    </Flex>
  );
};

const applyFilters: (
  opts: Omit<ApplicationFilterData, 'hasChanges'>
) => (applications: ListApplicationsResponse) => ListApplicationsResponse =
  ({ searchText, tags, categories, sortOrder }) =>
  (apps) => {
    // sort by search text
    if (searchText) {
      apps = apps.filter((a) =>
        a.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    // sort by tags
    if (tags.length) {
      apps = apps.filter((a) => tags.some((t) => a.tags.includes(t)));
    }

    // sort by category
    if (categories.length) {
      apps = apps.filter((a) =>
        categories.some((c) => a.categories.includes(c))
      );
    }
    // sort by sort order
    if (sortOrder === SortOrder.AZ) {
      apps = apps.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === SortOrder.ZA) {
      apps = apps.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOrder === SortOrder.Newest) {
      apps = apps.sort((a, b) => a.lastUpdated - b.lastUpdated);
    } else if (sortOrder === SortOrder.Oldest) {
      apps = apps.sort((a, b) => b.lastUpdated - a.lastUpdated);
    }

    return apps;
  };

type ApplicationFilterOption = ApplicationCategory | ApplicationTag;

export const filterLabel: Record<ApplicationFilterOption, string> = {
  data: 'Data',
  analytics: 'Analytics',
  media: 'Media',
  communication: 'Communication',
  email: 'Email',
  calendar: 'Calendar',
  images: 'Images',
  productivity: 'Productivity',
  utilities: 'Utilities',
  storage: 'Storage',
  sms: 'SMS',
  'incident-response': 'Incidents',
  marketing: 'Marketing',
  chat: 'Chat',
  'artificial-intelligence': 'AI',
  notes: 'Notes',
  system: 'System',
  new: 'New',
  featured: 'Featured',
  internal: 'Internal',
  popular: 'Popular',
  free: 'Free',
  paid: 'Paid',
  beta: 'Beta',
};

export const filterOptionColors: Record<
  ApplicationFilterOption,
  'primary' | 'warning' | 'secondary' | 'success' | 'error'
> = {
  data: 'primary',
  analytics: 'primary',
  media: 'primary',
  communication: 'primary',
  email: 'primary',
  calendar: 'primary',
  images: 'primary',
  productivity: 'primary',
  utilities: 'primary',
  storage: 'primary',
  sms: 'primary',
  'incident-response': 'primary',
  marketing: 'primary',
  chat: 'primary',
  'artificial-intelligence': 'primary',
  notes: 'primary',
  system: 'primary',
  internal: 'error',
  new: 'warning',
  featured: 'secondary',
  free: 'success',
  paid: 'success',
  popular: 'secondary',
  beta: 'success',
};

const defaultCategoryFilters: Record<ApplicationCategory, boolean> = {
  data: true,
  analytics: true,
  media: true,
  communication: true,
  email: true,
  calendar: true,
  images: true,
  productivity: true,
  utilities: true,
  storage: true,
  sms: true,
  'incident-response': true,
  marketing: true,
  chat: true,
  'artificial-intelligence': true,
  notes: true,
  system: false,
};

const defaultTagFilters: Record<ApplicationTag, boolean> = {
  new: false,
  internal: false,
  featured: false,
  popular: false,
  free: false,
  paid: false,
  beta: false,
};

const categoryOptions = Object.keys(filterLabel).filter(
  (k) => k in defaultCategoryFilters
) as ApplicationCategory[];

const tagOptions = Object.keys(filterLabel).filter(
  (k) => k in defaultTagFilters
) as ApplicationTag[];

const filterFalse = <T extends Record<string, boolean>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v)) as T;

type ApplicationFilterData = {
  searchText: string;
  tags: ApplicationTag[];
  categories: ApplicationCategory[];
  sortOrder: SortOrder;
  hasChanges: boolean;
};

export const ApplicationsFilterSection: FC<{
  applications: ListApplicationsResponse;
  data: ApplicationFilterData;
  onChange: (opts: Partial<ApplicationFilterData>) => void;
  onReset: () => void;
}> = ({ applications, onChange, data, onReset }) => {
  const { isMobile } = useLayout();

  const numActiveFilters = data.tags.length + data.categories.length;

  const [showFilters, setShowFilters] = useState(false);

  const handleChangeSortOrder = (so: SortOrder) => {
    onChange({
      sortOrder: so,
    });
  };

  const handleSearchTextUpdate = (value: string) => {
    onChange({
      searchText: value,
    });
  };

  const handleResetAll = () => {
    onReset();
    showFilters && setShowFilters(false);
  };

  const handleClearAllFilters = () => {
    onChange({
      tags: [],
      categories: [],
    });
  };

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
      <Flex column={isMobile} gap={1} grow spaceBetween>
        <Flex grow gap={3}>
          <Flex gap={0.5}>
            <Typography fontWeight={900} variant="body1">
              Apps
            </Typography>
            <Typography fontWeight={900} variant="body2" color="text.secondary">
              ({applications.length})
            </Typography>
          </Flex>
          <Flex grow maxWidth={500}>
            <TinyTextField
              fullWidth
              icon={<SearchOutlined />}
              placeholder="Filter by name"
              value={data.searchText}
              onChange={handleSearchTextUpdate}
            />
          </Flex>
        </Flex>
        <Flex gap={1} spaceBetween>
          <Flex gap={1} wrap>
            <ApplicationFiltersButton
              activeFilters={numActiveFilters}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'} (
              {numActiveFilters})
            </ApplicationFiltersButton>
            <SortMenuButton
              value={data.sortOrder}
              onSelect={handleChangeSortOrder}
            />
          </Flex>
          <LinkButton onClick={handleResetAll} disabled={!data.hasChanges}>
            Reset All
          </LinkButton>
        </Flex>
      </Flex>
      <Collapse in={showFilters}>
        <Flex column gap={2}>
          <Flex gap={1} wrap pt={2}>
            <FilterOptionToggles
              options={categoryOptions}
              filters={data.categories}
              setFilters={(filters) =>
                onChange({ categories: filters as ApplicationCategory[] })
              }
            />
            <FilterOptionToggles
              options={tagOptions}
              filters={data.tags}
              setFilters={(filters) => {
                onChange({ tags: filters as ApplicationTag[] });
              }}
            />
          </Flex>
          <LinkButton onClick={handleClearAllFilters}>
            Clear all filters
          </LinkButton>
        </Flex>
      </Collapse>
    </Paper>
  );
};

export const ApplicationFiltersButton: FC<{
  children: ReactNode;
  activeFilters: number;
  onClick: () => void;
}> = ({ children, activeFilters, onClick }) => {
  return (
    <Tooltip
      title="Showing applications that match all filters"
      placement="top"
      disableHoverListener={!activeFilters}
    >
      <span>
        <TinyToggle
          color="inherit"
          checked={true}
          startIcon={activeFilters ? <FilterAlt /> : <FilterAltOutlined />}
          onClick={() => onClick()}
        >
          {children}
        </TinyToggle>
      </span>
    </Tooltip>
  );
};

export const FilterOptionToggles: FC<{
  options: ApplicationFilterOption[];
  filters: string[];
  setFilters: (filters: string[]) => void;
}> = ({ options, filters, setFilters }) => (
  <>
    {options.map((o) => (
      <TinyToggle
        key={o}
        color={filterOptionColors[o]}
        checked={filters.includes(o)}
        onClick={() => {
          setFilters(
            filters.includes(o)
              ? filters.filter((v) => v !== o)
              : filters.concat(o)
          );
        }}
      >
        {filterLabel[o]}
      </TinyToggle>
    ))}
  </>
);

export const ApplicationsGrid: FC<{
  applications: ListApplicationsResponse;
}> = ({ applications }) => {
  return (
    <Grid container spacing={2}>
      {applications?.map((a) => (
        <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={a.id}>
          <ApplicationCard application={a} />
        </Grid>
      ))}
    </Grid>
  );
};
