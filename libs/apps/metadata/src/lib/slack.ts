import { ApplicationMetadata } from '../framework';

export const slack: ApplicationMetadata<'slack'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/slack.svg',
  title: 'Slack',
  subtitle: 'Send messages to Slack channels and users',
  categories: [
    'Communication',
    'Collaboration',
    'Productivity',
    'Chat',
    'Messaging',
  ],
  description:
    'Slack is a proprietary business communication platform developed by American software company Slack Technologies. Slack offers many IRC-style features, including persistent chat rooms organized by topic, private groups, and direct messaging.',
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl: 'https://api.slack.com/messaging/sending',
  methods: {
    listConversations: {
      title: 'List Conversations',
      description:
        'Returns a list of all channel-like conversations accessible to the user or app tied to the presented token. This method helps answer questions like: 1) Which conversations am I a member of? 2) Which public channels is my bot user in? 3) Do I have any direct messages open with my friend Suzy? 4) Is my bot a member of any private channels?',
      pricing: 0.001,
      sourceUrl: '',
    },
    sendChatMessage: {
      title: 'Send Chat Message',
      description:
        'Sends a message to a specific channel. This does not allow for direct messages to users. This function returns a timestamp of the new message, which also serves as a confirmation that the message was sent.',
      pricing: 0.001,
      sourceUrl: '',
    },
  },
};
