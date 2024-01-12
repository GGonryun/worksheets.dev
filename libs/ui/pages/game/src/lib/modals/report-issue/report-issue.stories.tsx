import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { ReportIssueModal } from './report-issue';

const Story: Meta<typeof ReportIssueModal> = {
  component: ReportIssueModal,
  args: {
    open: true,
    onClose: action('onClose'),
    onReport: action('onReport'),
  },
};
export default Story;

export const Primary = {
  args: {},
};
