import { ApplicationMetadata } from '../framework';

export const googleCalendar: ApplicationMetadata<'googleCalendar'> = {
  enabled: false,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/Google_Calendar_icon.svg',
  title: 'Google Calendar',
  subtitle:
    'Google Calendar is a time-management and scheduling calendar service developed by Google. Use this app to manage your Google Calendar.',
  categories: ['productivity', 'calendar'],
  tags: ['paid'],
  faq: [['TODO', 'TODO']],
  description:
    'Google Calendar is a time-management and scheduling calendar service developed by Google. The Google Calendar API is a RESTful API that exposes most of the features available in the Google Calendar Web interface.',
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl: 'https://developers.google.com/calendar',
  methods: {
    listEvents: {
      title: 'List Events',
      description: 'Lists the next 10 events in your google calendar',
      pricing: 0.001,
      sourceUrl:
        'https://developers.google.com/calendar/api/v3/reference/events/list',
    },
  },
};
