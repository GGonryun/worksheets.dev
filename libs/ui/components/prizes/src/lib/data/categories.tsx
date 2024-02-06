import {
  AccessTimeOutlined,
  AllInclusive,
  LocalFireDepartmentOutlined,
  NewReleasesOutlined,
} from '@mui/icons-material';
import { FilterablePrizeCategory } from '@worksheets/util/types';

export const prizeCategoryLabels: Record<FilterablePrizeCategory, string> = {
  active: 'Active',
  newest: 'Newest',
  hottest: 'Hottest',
  expiring: 'Ending Soon',
};

export const prizeCategoryIcons: Record<
  FilterablePrizeCategory,
  React.ReactNode
> = {
  active: <AllInclusive fontSize="large" color="black" />,
  newest: <NewReleasesOutlined fontSize="large" color="black" />,
  hottest: <LocalFireDepartmentOutlined fontSize="large" color="black" />,
  expiring: <AccessTimeOutlined fontSize="large" color="black" />,
};
