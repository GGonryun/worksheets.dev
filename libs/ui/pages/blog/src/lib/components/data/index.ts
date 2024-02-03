import { BlogAuthor } from '@worksheets/util/types';
import { MarkdownMetadata } from '@worksheets/util-markdown';

export const sampleAuthor: BlogAuthor = {
  id: 'miguel-campos',
  name: 'Miguel Campos',
  avatar: 'https://via.placeholder.com/150',
};

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
