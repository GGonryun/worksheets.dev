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
  bannerSrc: string;
  caption: MarkdownText;
  description: MarkdownText;
  url: string;
  category: string;
};

export type CharityCampaign = {
  organizationId: string;
  pledge: {
    required: number;
    current: number;
    games: number;
    players: number;
  };
  statistics: {
    countries: { name: string; hours: number }[];
    games: { id: string; name: string; plays: number }[];
    players: { new: number; returning: number };
  };
};
