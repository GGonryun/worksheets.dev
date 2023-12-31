import { CharityCampaign } from '@worksheets/util/types';

export const campaigns: Record<string, CharityCampaign> = {
  primary: {
    organizationId: 'water-org',
    pledge: { required: 100, current: 20 },
  },
};
