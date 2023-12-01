import { CharityOrganization } from '../types';

export const charities: Record<string, CharityOrganization> = {
  'water-org': {
    name: 'Water.org',
    bannerSrc: '/common/water-org/francisco-hands.jpg',
    caption:
      '[Water.org](https://water.org/) is an international nonprofit organization that has transformed millions of lives around the world with access to safe water and sanitation.',
    description: `
    ## What is Water.org?
    
    [Water.org](https://water.org/) is an international nonprofit organization that has transformed millions of lives around the world with access to safe water and sanitation. Water.org works with local partners to deliver innovative solutions for long-term success. Its microfinance-based WaterCredit Initiative is pioneering sustainable giving in the sector. Co-founded by Matt Damon and Gary White, Water.org has been recognized by Fast Company as one of the World's Most Innovative Companies and is proud to be [trusted](https://water.org/about-us/financials/) by [more than 1.9 million donors](https://water.org/about-us/financials/) around the world.


    ## Why donate water to struggling communities?
    
    We believe water is the way. To break the cycle of poverty. To protect and save lives. To make a bright future possible for all. Water.org makes it safe, accessible and cost-effective for everyone in the world to get clean water. Water.org works with partners and supporters to empower local communities by providing access to safe water and sanitation as well as health and hygiene education. Water is more than just the foundation of life. It's the foundation of a brighter future for all.

    ## How does Water.org use donations?
    Donations to Water.org go to work immediately and help them serve more people in need around the world with safe water and sanitation. Water.org provides a commitment to financial transparency and accountability with their donors. They are a top-rated charity with [Charity Navigator](https://www.charitynavigator.org/index.cfm?bay=search.summary&orgid=12548), a GuideStar Platinum participant and have received an [A+ rating](https://www.charitywatch.org/ratings-and-metrics/water-org/128) from CharityWatch. They are also a member of the Better Business Bureau's Wise Giving Alliance and a [Charity Seal Holder](https://www.give.org/charity-reviews/national/environmental-and-animal-protection/water-org-in-kansas-city-mo-12548) with the BBB Wise Giving Alliance. You can learn more about their financials [here](https://water.org/about-us/financials/).
    `,
    url: 'https://water.org/',
    category: 'Water and Sanitation',
    id: 'water-org',
  },
};

export const charityKeys = Object.keys(charities);

export const charityValues = Object.values(charities);
