import { NewsletterTopic } from '@prisma/client';

export const NEWSLETTER_TOPIC_REQUIREMENTS: Record<NewsletterTopic, boolean> = {
  WeeklyNewsletter: false,
  TipsAndTricks: false,
  NewGame: false,
  NewRaffle: false,
  NewAuction: false,
  Transactional: true,
};

export const NEWSLETTER_TOPIC_LABELS: Record<NewsletterTopic, string> = {
  NewGame: 'New Games',
  NewRaffle: 'New Raffles',
  NewAuction: 'New Auctions',
  WeeklyNewsletter: 'Weekly Newsletter',
  TipsAndTricks: 'Tips & Tricks',
  Transactional: 'Transactional',
};

export const REQUIRED_TOPICS: NewsletterTopic[] = Object.entries(
  NEWSLETTER_TOPIC_REQUIREMENTS
)
  .map(([topic, required]) => (required ? topic : null))
  .filter(Boolean) as NewsletterTopic[];

export const MODIFIABLE_TOPICS: NewsletterTopic[] = Object.entries(
  NEWSLETTER_TOPIC_REQUIREMENTS
)
  .map(([topic, required]) => (!required ? topic : null))
  .filter(Boolean) as NewsletterTopic[];

export const ALL_TOPICS: NewsletterTopic[] = Object.keys(
  NEWSLETTER_TOPIC_REQUIREMENTS
) as NewsletterTopic[];
