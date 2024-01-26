const BASE_URL = process.env['NEXT_PUBLIC_CHARITY_GAMES_BASE_URL'];

const urls = {
  charityGames: BASE_URL,
  email: {
    admin: 'admin@charity.games',
    support: 'support@charity.games',
  },
  forms: {
    submission: 'https://forms.gle/J8B542yAduanvZSf6',
  },
  poll: 'https://strawpoll.com/GeZAOVdBRnV',
  external: {
    waterOrg: 'https://www.water.org/',
    fullstory: 'https://www.fullstory.com/',
    g2ss: 'https://www.g2ss.com/',
    navwar: 'https://www.navwar.navy.mil/',
    sdsu: 'https://www.sdsu.edu/',
    usd: 'https://www.sandiego.edu/',
  },
  social: {
    instagram: 'https://www.instagram.com/charity.games/', // TODO
    reddit: `https://www.reddit.com/user/ggonryun/`,
    linkedIn: `https://www.linkedin.com/company/charity-games`,
    twitter: `https://twitter.com/charitydotgames`,
    facebook: `https://www.facebook.com/profile.php?id=61554655570040`,
    github: `https://github.com/ggonryun/worksheets.dev`,
    discord: `https://discord.gg/Auatjee2BZ`,
  },
  personal: {
    linkedIn: {
      miguel: 'https://www.linkedin.com/in/miguel-campos-5b1114172/',
      esbeidy: 'https://www.linkedin.com/in/esbeidy-campos-776352172',
    },
  },
};

export default urls;

export const createReferralLink = (code: string) => {
  return `${BASE_URL}/ref/${code}`;
};
