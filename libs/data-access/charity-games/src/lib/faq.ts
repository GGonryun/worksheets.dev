import urls from '@worksheets/util/urls';

export const faq = [
  {
    question: "What's your mission?",
    answer:
      'We want to make the world a better place by using video games to raise money for charity.',
    id: 'whats-your-mission',
  },

  {
    question: 'How does playing games raise money for charity?',
    answer: `We're using ad revenue to raise money for charity. We're also working on adding support for donations. Our primary focus is to raise awareness by creating a community of gamers who want to make a difference.`,
    id: `how-does-playing-games-raise-money-for-charity`,
  },
  {
    question: 'Where do games come from?',
    answer: `From people like you! We're a community driven platform. We're working on adding support for uploading games directly to our platform. In the meantime, you can submit games to us through our [Contribution Portal](/contribute).`,
    id: 'where-do-games-come-from',
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
    question: "I don't trust you, how do I know you're legit?",
    answer: `That's understandable. We're a new organization. We'll never ask you for money, all of our services are provided for free at no expense to you, our players. Our platform aims to provide as much transparency as possible.

    Our code is publicly available on [GitHub](${urls.social.github}). 

    You can also see all of our donation receipts on our [Donations](/donations) page.
   
    If you have any questions, please feel free to [contact us](/contact).`,
    id: 'i-do-not-trust-you',
  },
  {
    question: 'Who runs Charity.Games?',
    answer:
      'Charity.Games is run by volunteers. Currently there is no paid staff and we have 1 volunteer. Your feedback is greatly appreciated.',
    id: 'who-runs-charity-games',
  },
  {
    question: 'I found a bug, what should I do?',
    answer: `Please report it to us on our [GitHub](${urls.social.github}) page. Or visit our [Contact](/contact) page to submit an email or join our Discord.`,
    id: 'i-found-a-bug-what-should-i-do',
  },
  {
    question: 'Do I need an account?',
    answer: `Creating a Charity.Games account unlocks several important features. You can:
    
    - Participate in raffles and giveaways.
    - Compete on game leaderboards.
    - Save your favorite games.
    - Earn achievements.
    - Vote on games and charities.
    - Submit games to our platform.

    You can play all of our games without an account, but you won't be able to do any of the above.

    [Create your account today](/signup)`,
    id: 'do-i-need-an-account',
  },
];
