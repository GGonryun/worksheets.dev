import {
  AccessTimeOutlined,
  AllInclusive,
  LocalFireDepartmentOutlined,
  NewReleasesOutlined,
  VerifiedOutlined,
} from '@mui/icons-material';
import { PrizeCategory } from '@worksheets/util/types';

export type FilterablePrizeCategory = Extract<
  PrizeCategory,
  'all' | 'newest' | 'hottest' | 'qualified' | 'expiring'
>;

export const prizeCategoryLabels: Record<FilterablePrizeCategory, string> = {
  all: 'All',
  newest: 'Newest',
  hottest: 'Hottest',
  qualified: 'Qualified',
  expiring: 'Ending Soon',
};

export const prizeCategoryIcons: Record<
  FilterablePrizeCategory,
  React.ReactNode
> = {
  all: <AllInclusive fontSize="large" color="black" />,
  newest: <NewReleasesOutlined fontSize="large" color="black" />,
  hottest: <LocalFireDepartmentOutlined fontSize="large" color="black" />,
  qualified: <VerifiedOutlined fontSize="large" color="black" />,
  expiring: <AccessTimeOutlined fontSize="large" color="black" />,
};
