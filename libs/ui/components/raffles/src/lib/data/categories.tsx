import { AccessTimeOutlined, NewReleasesOutlined } from '@mui/icons-material';
import { FilterableRaffleCategory } from '@worksheets/util/types';

export const raffleCategoryLabels: Record<FilterableRaffleCategory, string> = {
  newest: 'Newest',
  expiring: 'Ending Soon',
};

export const raffleCategoryIcons: Record<
  FilterableRaffleCategory,
  React.ReactNode
> = {
  newest: <NewReleasesOutlined fontSize="large" color="black" />,
  expiring: <AccessTimeOutlined fontSize="large" color="black" />,
};
