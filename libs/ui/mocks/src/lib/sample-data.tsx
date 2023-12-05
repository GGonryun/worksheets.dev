import { MixedGridItem } from '@worksheets/ui/game-grid';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import {
  CharityOrganization,
  GameDefinition,
  GameIcon,
  Recommendations,
} from '@worksheets/util/types';

export const sampleMixedGridItems = () => [
  ...Array.from({ length: 3 }).map((_, i) => ({
    type: 'category' as const,
    id: `${i}`,
    name: 'Category ' + i,
  })),
  ...Array.from({ length: 20 }).map((_, i) => ({
    type: 'game' as const,
    id: `${i}`,
    name: 'Game ' + i,
    imageUrl: i % 15 === 1 ? 'https://via.placeholder.com/150' : undefined,
    span: i % 7 === 3 ? 2 : i % 17 === 7 ? 3 : 1,
  })),
  ...Array.from({ length: 3 }).map((_, i) => ({
    type: 'category' as const,
    id: `${i}`,
    name: 'Category ' + i + 3,
  })),
  ...Array.from({ length: 20 }).map((_, i) => ({
    type: 'game' as const,
    id: `${i + 20}`,
    name: 'Game ' + i + 20,
    imageUrl: i % 15 === 1 ? 'https://via.placeholder.com/150' : undefined,
    span: i % 7 === 3 ? 2 : i % 17 === 7 ? 3 : 1,
  })),
  ...Array.from({ length: 3 }).map((_, i) => ({
    type: 'category' as const,
    id: `${i + 6}`,
    name: 'Category ' + i + 6,
  })),
  ...Array.from({ length: 5 }).map((_, i) => ({
    type: 'game' as const,
    id: `${i + 40}`,
    name: 'Game ' + i + 40,
    imageUrl: i % 15 === 1 ? 'https://via.placeholder.com/150' : undefined,
    span: 1,
  })),
];

export const sampleBlogMetadata: MarkdownMetadata[] = [
  {
    title: 'Blog Post 1',
    excerpt:
      'This is the excerpt for blog post 1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    coverImage: 'https://picsum.photos/seed/1/600/400',
    tags: ['tag1', 'tag2', 'tag3'],
    date: '10-27-2023',
    authorId: 'miguel-campos',
    ogImage: { url: 'https://picsum.photos/seed/1/600/400' },
    slug: 'blog-post-1',
  },
  {
    title: 'Blog Post 2',
    excerpt:
      'This is the excerpt for blog post 2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    coverImage: 'https://picsum.photos/seed/2/600/400',
    tags: ['tag1', 'tag2', 'tag3'],
    authorId: 'miguel-campos',
    ogImage: { url: 'https://picsum.photos/seed/2/600/400' },
    date: '11-11-2023',
    slug: 'blog-post-2',
  },
];

export const sampleBlogPost = `<p>Welcome to Charity Games! This is a website where you can play games with a purpose. All the games are free to play and I pledge to donate all proceeds to charity. The website is currently in beta and I'm looking for feedback. If you have any suggestions or comments, please let me know!</p>
<h2>How it works</h2>
<p>In the future the goal is to place one unobtrusive ad on the title screens of every game page and donate the revenue to charity. Right now donations will come out of my pocket. I'm not sure how much money I'll be able to donate, but I'll do my best. I'll be posting updates on the <a href="/blog">blog</a> and receipts on the <a href="/donations">donations</a> page.</p>
<h2>Why am I doing this?</h2>
<p>My journey started when I tried to create an IPaaS competitor to Zapier last year, called Gwenyth.IO which later evolved to <a href="https://worksheets.dev">Worksheets.dev</a>. I went to some meetups and promoted myself but I felt empty. Everyone was cheering me on, telling me it was a great idea but deep down I knew it wasn't. Zapier was an excellent product and I didn't want to sell my mediocre alternative. I went back to the drawing board, taking note of what was really important to me:</p>
<ol>
<li>Using my current skills and picking up new ones along the way.</li>
<li>Creating something I would use.</li>
<li>Making something that was useful. Nobody needs another Zapier clone.</li>
</ol>
<p>I took stock of my skills and reflected on my past. Who am I? Why am I doing this?</p>
<h2>Who am I?</h2>
<p>I can code, that's a start. I don't really want to make enterprise software; I already do that for a living. I like to rock climb, but I don't know the industry well enough. I dug into my past some more. Growing up I played games, my parents made me play lots of educational games. As a teenager I spun up my own private <a href="http://iro.ragnarokonline.com/">Ragnarok Server</a> and learned some basic scripting. In high school I joined the robitics club and competed in <a href="https://www.vexrobotics.com/">Vex Robotics</a> competitions. In college I took game development courses. I've always been interested in games, so why not make games?</p>
<p>Games are used to help people and it was already happening around me. There are communities like <a href="https://gamesdonequick.com/">Games Done Quick</a> who do speedrunning marathons for charity. There are <a href="https://www.extra-life.org/">Extra Life</a> and <a href="https://childsplaycharity.org/">Child's Play</a> who raise money for children's hospitals. There is <a href="https://freerice.com/">Freerice</a> who donates rice to the hungry. There are so many examples of games being used to help people and I wanted to be a part of that. I found my inspiration.</p>
<h2>Is it worth it?</h2>
<p>Well, there's only one way to find out. I'm going to commit to this challenge. Worst case scenario? I learned a thing or two and helped a few people along the way. I'm okay with that. This isn't something I can do alone. I'll never ask for money. If you want to help, just play the games and share them with your friends. If you want to help even more, consider donating to any charity. I don't need to know, I don't need to be involved. Just do it. I'll be doing the same.</p>`;

export const dummySocials = {
  facebook: 'https://www.facebook.com/CharityGamesOfficial',
  twitter: 'https://twitter.com/CharityGamesO',
  instagram: 'https://www.instagram.com/charitygamesofficial/',
  youtube: 'https://www.youtube.com/channel/UC1Jx7XJ1yYQ7WjQx0eQq6Og',
  twitch: 'https://www.twitch.tv/charitygamesofficial',
  discord: 'https://discord.gg/charitygames',
  website: 'https://charitygames.io',
  itchio: 'https://charitygames.itch.io/',
  tiktok: 'https://www.tiktok.com/@charitygamesofficial',
  steam: 'https://store.steampowered.com/charity/charitygames',
  playstore: 'https://play.google.com/store/apps/dev?id=7196278445280289529',
  appstore:
    'https://apps.apple.com/us/developer/charity-games-llc/id1537154374',
};

export const sampleGameDefinitions: GameDefinition[] = Array.from({
  length: 5,
}).map((_, i) => ({
  id: `${i}`,
  name: 'Game ' + i,
  developer: 'Charity.Games',
}));

export const sampleGameItems: MixedGridItem[] = Array.from({ length: 20 }).map(
  (_, i) => ({
    type: 'game',
    id: `${i}`,
    name: 'Game ' + i,
    span: 1,
  })
);

export const sampleCategoryItems: MixedGridItem[] = Array.from({
  length: 5,
}).map((_, i) => ({
  type: 'category',
  id: `${i}`,
  name: 'Category ' + i,
}));

export const sampleCategoryDescription = `
# About Idle Games
Idle games don't require much interaction from the player. They are a great way to pass the time. These games keep going even when you're not playing, so you can come back later to see how things have progressed.

### What are some other names for idle games?
Idle games are also known as incremental games, clicker games, or idle clickers. These names all refer to the same type of game.

### What's the appeal of idle games?
Idle games are popular because they don't require much effort to play. You can just sit back and watch the numbers go up! They're also great for people who want to play a game but don't have time to commit to something more involved.

### What are some examples of idle games?
Some popular idle games include Cookie Clicker, Clicker Heroes, and Adventure Capitalist. These games are all available on Kongregate.com!

### Any tips for playing idle games?
The best way to play an idle game is by setting up your computer so that it runs in the background while you do other things. This will allow you to earn more points without having to actively play the game. You can also use scripts or bots to automate certain tasks in the game.

### Do idle games have an end?
Some idle games do have an end, but most of them are endless. The goal is to get as far into the game as possible before you stop playing. This can be done by upgrading units in the game, or by using special abilities that allow you to progress further. Some games implement a prestige system that allows you to start over with additional bonuses after reaching certain milestones.
`;

export const sampleGameIconsOfRealGames: GameIcon[] = [
  {
    id: 'solitaire',
    name: 'Solitaire',
    imageUrl: '/games/solitaire/icon.jpg',
  },
  {
    id: 'emoji-war',
    name: 'Emoji War',
    imageUrl: '/games/emoji-war/icon.jpg',
  },
  {
    id: 'chess-kata',
    name: 'Chess Kata',
    imageUrl: '/games/chess-kata/icon.jpg',
  },
  {
    id: 'nonograms',
    name: 'Nonograms',
    imageUrl: '/games/nonograms/icon.jpg',
  },
  {
    id: 'word-smith',
    name: 'Word Smith',
    imageUrl: '/games/word-smith/icon.jpg',
  },
  {
    id: 'word-search',
    name: 'Word Search',
    imageUrl: '/games/word-search/icon.jpg',
  },
  {
    id: 'word-pack',
    name: 'Word Pack',
    imageUrl: '/games/word-pack/icon.jpg',
  },
];

export const sampleRecommendations: Recommendations = {
  new: sampleGameIconsOfRealGames.map((i) => ({ ...i, banner: 'new' })),
  popular: sampleGameIconsOfRealGames.map((i) => ({ ...i, banner: 'hot' })),
  categories: Array.from({ length: 10 }).map((_, i) => ({
    id: i.toString(),
    name: `Category ${i}`,
  })),
};

export const sampleCharityOrganization: CharityOrganization = {
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
  Donations to Water.org go to work immediately and help them serve more people in need around the world with safe water and sanitation. Water.org provides a commitment to financial transparency and accountability with their donors. They are a top-rated charity with [Charity Navigator](https://www.charitynavigator.org/index.cfm?bay=search.summary&orgid=12548), a GuideStar Platinum participant and have received an [A+ rating](https://www.charitywatch.org/ratings-and-metrics/water-org/128) from CharityWatch. They are also a [Charity Seal Holder](https://www.give.org/charity-reviews/national/environmental-and-animal-protection/water-org-in-kansas-city-mo-12548) with the BBB Wise Giving Alliance. You can learn more about their financials [here](https://water.org/about-us/financials/).
  `,
  url: 'https://water.org/',
  category: 'Water and Sanitation',
  id: 'water-org',
};
