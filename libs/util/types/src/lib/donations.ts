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
  caption: string;
  description: string;
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
};
