import {
  AccessTimeOutlined,
  AllInclusive,
  AttachMoney,
  LocalFireDepartmentOutlined,
  NewReleasesOutlined,
  VerifiedOutlined,
} from '@mui/icons-material';
import { z } from '@worksheets/zod';

export const prizeCategorySchema = z.enum([
  'all',
  'newest',
  'hottest',
  'cheapest',
  'qualified',
  'expiring',
]);

export type PrizeCategory = z.infer<typeof prizeCategorySchema>;

export const prizeCategoryLabels: Record<PrizeCategory, string> = {
  all: 'All',
  newest: 'Newest',
  hottest: 'Hottest',
  cheapest: 'Cheapest',
  qualified: 'Qualified',
  expiring: 'Ending Soon',
};

export const prizeCategoryIcons: Record<PrizeCategory, React.ReactNode> = {
  all: <AllInclusive fontSize="large" color="black" />,
  newest: <NewReleasesOutlined fontSize="large" color="black" />,
  hottest: <LocalFireDepartmentOutlined fontSize="large" color="black" />,
  cheapest: <AttachMoney fontSize="large" color="black" />,
  qualified: <VerifiedOutlined fontSize="large" color="black" />,
  expiring: <AccessTimeOutlined fontSize="large" color="black" />,
};
