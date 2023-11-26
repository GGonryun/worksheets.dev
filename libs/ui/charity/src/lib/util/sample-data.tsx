import { GameDescription } from '../content/game-screen/game-description';
import { GameLauncher } from '../content/game-screen/game-launcher/';
import { MixedGridItem } from '../games/mixed-grid-items';
import { GameDefinition } from './games';

export const SampleGameLauncher = () => (
  <GameLauncher
    backgroundUrl={
      'https://storage.googleapis.com/game-art/solitaire/banner.png'
    }
    iconUrl={'https://storage.googleapis.com/game-art/solitaire/icon.jpg'}
    gameUrl={'https://storage.googleapis.com/unity-2d/index.html'}
    name={'Solitaire'}
    developer={'Charity.Games'}
    onReportBug={() => alert('TODO: show bug report form')}
    onEnterFullscreen={() => alert('TODO: enter fullscreen')}
    onExitFullscreen={() => alert('TODO: exit fullscreen')}
    onPlay={() => alert('TODO: play game')}
  />
);

export const SampleGameDescription = () => (
  <GameDescription
    title="Solitaire"
    developer={{ id: '1', name: 'Charity.Games' }}
    platforms={['mobile', 'desktop']}
    tags={['card', 'single-player', 'brain', 'board', 'puzzle']}
    category={['card']}
    created="October 2023"
    updated="October 2023"
    text={`
    Solitaire is a card game that you play by yourself. You only need a standard deck of 52 cards to play, so it's a great game to play when traveling alone or just when you are bored and want something to do. There are a lot of different types of solitaire you can play.
  
    ### How to Play Solitaire?
    The goal of solitaire is to get all 52 cards into four piles, each arranged by suit and in order from ace to king. Gameplay varies depending on the type of solitaire you play, but the main goal is always the same: to get all cards into the correct order.
  
    ### Who created Solitaire?
    The first known solitaire game rules were recorded during the Napoleonic era. The author of the first known solitaire rules was Lady Adelaide Cadogan, who wrote her rules in the late 1870s or early 1880s. Lady Cadogan's book was titled Illustrated Games of Patience and it was published in the United Kingdom in 1875. The book was very popular among the upper classes and eventually became known as The Solitaire Bible.
  
    ### Controls
    - Click and drag to move cards
    - Double click to move cards to the foundation
    - Click on the deck to draw cards
    `}
    markets={{
      android:
        'https://play.google.com/store/apps/details?id=com.charitygames.solitaire',
      ios: 'https://apps.apple.com/us/app/solitaire/id1569874085',
      steam: 'https://store.steampowered.com/widget/500',
      itch: 'https://itch.io/embed/2257102',
    }}
  />
);

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

export const sampleBlogMetadata = [
  {
    title: 'Blog Post 1',
    excerpt:
      'This is the excerpt for blog post 1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    coverImage: 'https://picsum.photos/seed/1/600/400',
    tags: ['tag1', 'tag2', 'tag3'],
    date: 'October 27, 2023',
    author: {
      name: 'Author 1',
      picture: 'https://picsum.photos/seed/1/600/400',
      id: 'author-1',
    },
    ogImage: { url: 'https://picsum.photos/seed/1/600/400' },
    slug: 'blog-post-1',
  },
  {
    title: 'Blog Post 2',
    excerpt:
      'This is the excerpt for blog post 2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    coverImage: 'https://picsum.photos/seed/2/600/400',
    tags: ['tag1', 'tag2', 'tag3'],
    author: {
      name: 'Author 1',
      picture: 'https://picsum.photos/seed/2/600/400',
      id: 'author-1',
    },
    ogImage: { url: 'https://picsum.photos/seed/2/600/400' },
    date: 'November 11, 2023',
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
