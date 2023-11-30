import { MarkdownText } from '@worksheets/ui-core';

export type DonationReceipt = {
  date: Date;
  organizationId: string;
  receipt: string;
  quantity: number;
};

export type CharityOrganization = {
  id: string;
  name: string;
  caption: MarkdownText;
  description: MarkdownText;
  url: string;
  category: string;
};
