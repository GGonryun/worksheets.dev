import {
  AccessTimeOutlined,
  AllInclusive,
  LocalFireDepartmentOutlined,
  NewReleasesOutlined,
} from '@mui/icons-material';
import { FilterableRaffleCategory } from '@worksheets/util/types';

export const raffleCategoryLabels: Record<FilterableRaffleCategory, string> = {
  active: 'Active',
  newest: 'Newest',
  hottest: 'Hottest',
  expiring: 'Ending Soon',
};

export const raffleCategoryIcons: Record<
  FilterableRaffleCategory,
  React.ReactNode
> = {
  active: <AllInclusive fontSize="large" color="black" />,
  newest: <NewReleasesOutlined fontSize="large" color="black" />,
  hottest: <LocalFireDepartmentOutlined fontSize="large" color="black" />,
  expiring: <AccessTimeOutlined fontSize="large" color="black" />,
};
