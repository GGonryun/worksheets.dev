import { urls } from '../lib/util';

export const faq = [
  {
    question: "What's your mission?",
    answer:
      'We want to make the world a better place by using video games to raise money for charity.',
    id: 'whats-your-mission',
  },
  {
    question: "I don't trust you, how do I know you're legit?",
    answer: `That's understandable. We're a new organization. We're not a registered non-profit, but we're working on it. We're not asking for money, so you don't have to trust us. We're just asking for your feedback and support. Our code is publicly available on [GitHub](${urls.social.github}). You can also see all of our donation receipts on our [Donations](/donations) page`,
    id: 'i-do-not-trust-you',
  },
  {
    question: 'Who do you support?',
    answer: `We support a different charity each month. You can see the current campaign on our [Charity](/charity) page, and you can vote for next month's charity on our [Strawpoll](${urls.poll}) page.`,
    id: 'who-do-you-support',
  },
  {
    question: 'How can I help?',
    answer:
      'Visit our [Help](/help) page to learn more about how you can help. Depending on your skills, you can help us by creating games, playing games, donating, or volunteering.',
    id: 'how-can-i-help',
  },
  {
    question: 'Why was this organization created?',
    answer:
      'This organization was created to help people in need. We wanted to use the skills we have to make an impact.',
    id: 'why-was-this-organization-created',
  },
  {
    question: 'Who runs Charity.Games?',
    answer:
      'Charity.Games is run by volunteers. Currently there is no paid staff and we have 1 volunteer. Your feedback is greatly appreciated.',
    id: 'who-runs-charity-games',
  },
  {
    question: 'How do you make money?',
    answer:
      "We don't. We're a non-profit organization. We're broke. Please donate, but not to us because we don't have a bank account. Donate to our charity of choice, [Water.org](https://Water.org)",
    id: 'how-do-you-make-money',
  },
  {
    question: 'I found a bug, what should I do?',
    answer: `Please report it to us on our [GitHub](${urls.social.github}) page. Or visit our [Contact](/contact) page to submit an email or join our Discord.`,
    id: 'i-found-a-bug-what-should-i-do',
  },
  {
    question: 'Do I need an account?',
    answer: `An account lets you submit games to our platform. In the near future we'll be adding support for commenting, following, and creating lists of your favorite games.`,
    id: 'do-i-need-an-account',
  },
];
