import {
  ApplicationCategory,
  ApplicationTag,
} from '@worksheets/schemas-applications';

export type ApplicationFilterOption = ApplicationCategory | ApplicationTag;

export const defaultCategoryFilters: Record<ApplicationCategory, boolean> = {
  data: true,
  analytics: true,
  media: true,
  communication: true,
  email: true,
  calendar: true,
  images: true,
  productivity: true,
  utilities: true,
  storage: true,
  sms: true,
  'incident-response': true,
  marketing: true,
  chat: true,
  'artificial-intelligence': true,
  notes: true,
  system: false,
};

export const defaultTagFilters: Record<ApplicationTag, boolean> = {
  new: false,
  internal: false,
  featured: false,
  popular: false,
  free: false,
  paid: false,
  beta: false,
};

export const filterLabel: Record<ApplicationFilterOption, string> = {
  data: 'Data',
  analytics: 'Analytics',
  media: 'Media',
  communication: 'Communication',
  email: 'Email',
  calendar: 'Calendar',
  images: 'Images',
  productivity: 'Productivity',
  utilities: 'Utilities',
  storage: 'Storage',
  sms: 'SMS',
  'incident-response': 'Incidents',
  marketing: 'Marketing',
  chat: 'Chat',
  'artificial-intelligence': 'AI',
  notes: 'Notes',
  system: 'System',
  new: 'New',
  featured: 'Featured',
  internal: 'Internal',
  popular: 'Popular',
  free: 'Free',
  paid: 'Paid',
  beta: 'Beta',
};

export const filterOptionColors: Record<
  ApplicationFilterOption,
  'primary' | 'warning' | 'secondary' | 'success' | 'error'
> = {
  data: 'primary',
  analytics: 'primary',
  media: 'primary',
  communication: 'primary',
  email: 'primary',
  calendar: 'primary',
  images: 'primary',
  productivity: 'primary',
  utilities: 'primary',
  storage: 'primary',
  sms: 'primary',
  'incident-response': 'primary',
  marketing: 'primary',
  chat: 'primary',
  'artificial-intelligence': 'primary',
  notes: 'primary',
  system: 'primary',
  internal: 'error',
  new: 'warning',
  featured: 'secondary',
  free: 'success',
  paid: 'success',
  popular: 'secondary',
  beta: 'success',
};
