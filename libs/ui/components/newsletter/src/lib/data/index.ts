import { MODIFIABLE_TOPICS } from '@worksheets/util/settings';
import { NewsletterSubscriptionForm } from '@worksheets/util/types';

export const EMPTY_NEWSLETTER_SUBSCRIPTION_FORM: NewsletterSubscriptionForm = {
  email: '',
  topics: MODIFIABLE_TOPICS,
};
