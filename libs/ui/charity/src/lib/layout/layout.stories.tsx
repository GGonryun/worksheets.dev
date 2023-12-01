import type { Meta } from '@storybook/react';
import { Layout } from './layout';
import { Container, Typography } from '@mui/material';
import { MixedGrid } from '../games/mixed-grid';
import {
  GameScreen,
  LoginScreen,
  AccountScreen,
  AboutScreen,
  ContactScreen,
  FAQScreen,
  BlogPostScreen,
  BlogScreen,
  UnderConstruction,
  DeveloperScreen,
  CategoryScreen,
  HelpScreen,
  ReceiptScreen,
  CharityScreen,
} from '../content';
import {
  SampleGameDescription,
  SampleGameLauncher,
  dummySocials,
  sampleBlogMetadata,
  sampleBlogPost,
  sampleCategoryDescription,
  sampleCategoryItems,
  sampleCharityOrganization,
  sampleDonationReceipts,
  sampleGameDefinitions,
  sampleGameItems,
  sampleMixedGridItems,
  sampleRecommendations,
} from '../_samples';
import { urls } from '../util';

const Story: Meta<typeof Layout> = {
  component: Layout,
  title: 'Layout/WebsiteLayout',
  args: {
    onSearch: async () => {
      return { games: [], categories: [] };
    },
    recommendations: sampleRecommendations,
  },
  decorators: [
    (Story) => (
      <main>
        <Story />
      </main>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    children: (
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
        fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
        aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis
        in cum quibusdam sed quae, accusantium et aperiam? Quod itaque
        exercitationem, at ab sequi qui modi delectus quia corrupti alias
        distinctio nostrum. Minima ex dolor modi inventore sapiente
        necessitatibus aliquam fuga et. Sed numquam quibusdam at officia
        sapiente porro maxime corrupti perspiciatis asperiores, exercitationem
        eius nostrum consequuntur iure aliquam itaque, assumenda et! Quibusdam
        temporibus beatae doloremque voluptatum doloribus soluta accusamus porro
        reprehenderit eos inventore facere, fugit, molestiae ab officiis illo
        voluptates recusandae. Vel dolor nobis eius, ratione atque soluta,
        aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
        Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
        delectus quo eius exercitationem tempore. Delectus sapiente, provident
        corporis dolorum quibusdam aut beatae repellendus est labore quisquam
        praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
        deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
        fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
        recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
        debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
        praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
        voluptate iure labore, repellendus beatae quia unde est aliquid dolor
        molestias libero. Reiciendis similique exercitationem consequatur, nobis
        placeat illo laudantium! Enim perferendis nulla soluta magni error,
        provident repellat similique cupiditate ipsam, et tempore cumque quod!
        Qui, iure suscipit tempora unde rerum autem saepe nisi vel cupiditate
        iusto. Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid
        inventore commodi reprehenderit rerum reiciendis! Quidem alias
        repudiandae eaque eveniet cumque nihil aliquam in expedita, impedit quas
        ipsum nesciunt ipsa ullam consequuntur dignissimos numquam at nisi porro
        a, quaerat rem repellendus. Voluptates perspiciatis, in pariatur
        impedit, nam facilis libero dolorem dolores sunt inventore perferendis,
        aut sapiente modi nesciunt.
      </Typography>
    ),
  },
};

export const HomePage = {
  args: {
    children: (
      <Container
        maxWidth="xl"
        sx={{
          py: 2,
        }}
      >
        <MixedGrid
          items={Array.from({ length: 100 }).map((_, i) => {
            if (i === 3) {
              return {
                type: 'progress',
                color: 'error',
                current: 33,
                required: 100,
              };
            } else if (i % 23 === 4 || i % 23 === 17) {
              return {
                type: 'category',
                id: `${i}`,
                name: 'Category ' + i,
              };
            } else {
              return {
                type: 'game',
                id: `${i}`,
                name: 'Game ' + i,
                banner: i % 17 === 3 ? 'hot' : undefined,
                span: i % 7 === 3 ? 2 : i % 23 === 7 ? 3 : 1,
              };
            }
          })}
        />
      </Container>
    ),
  },
};

export const HomePageSuccessfulSearch = {
  args: {
    onSearch: async () => {
      return {
        games: [
          {
            href: '#',
            name: 'Game Name 1',
            developer: 'Developer Name',
            imageUrl: 'https://via.placeholder.com/150',
          },
          {
            href: '#',
            name: 'Game Name 2',
            developer: 'Developer Name',
            imageUrl: 'https://via.placeholder.com/150',
          },
          {
            href: '#',
            name: 'Game Name 3',
            developer: 'Developer Name',
            imageUrl: 'https://via.placeholder.com/150',
          },
          {
            href: '#',
            name: 'Game Name 4',
            developer: 'Developer Name',
            imageUrl: 'https://via.placeholder.com/150',
          },
        ],
        categories: [
          {
            href: '#',
            name: 'Category Name 1',
            imageUrl: 'https://via.placeholder.com/150',
          },
          {
            href: '#',
            name: 'Category Name 2',
            imageUrl: 'https://via.placeholder.com/150',
          },
          {
            href: '#',
            name: 'Category Name 3',
            imageUrl: 'https://via.placeholder.com/150',
          },
        ],
      };
    },
    children: (
      <Container
        maxWidth="xl"
        sx={{
          py: 2,
        }}
      >
        <MixedGrid
          items={Array.from({ length: 100 }).map((_, i) => {
            if (i === 0) {
              return {
                type: 'progress',
                current: 33,
                required: 100,
              };
            } else if (i % 23 === 4 || i % 23 === 17) {
              return {
                type: 'category',
                id: `${i}`,
                name: 'Category ' + i,
              };
            } else {
              return {
                type: 'game',
                id: `${i}`,
                name: 'Game ' + i,
                banner: i % 17 === 3 ? 'hot' : undefined,
                span: i % 7 === 3 ? 2 : i % 23 === 7 ? 3 : 1,
              };
            }
          })}
        />
      </Container>
    ),
  },
};

export const CategoryPage = {
  args: {
    children: (
      <CategoryScreen
        text="Idle Games"
        description={sampleCategoryDescription}
        games={sampleGameItems}
        categories={sampleCategoryItems}
      />
    ),
  },
};

export const CategoriesPage = {
  args: {
    onSearch: async () => {
      return { games: [], categories: [] };
    },
    recommendations: sampleRecommendations,
    children: (
      <Container
        maxWidth="xl"
        sx={{
          py: 2,
        }}
      >
        <MixedGrid
          items={Array.from({ length: 100 }).map((_, i) => {
            return {
              type: 'category',
              id: `${i}`,
              name: 'Category ' + i,
            };
          })}
        />
      </Container>
    ),
  },
};

export const GamePage = {
  args: {
    children: (
      <GameScreen
        game={<SampleGameLauncher />}
        description={<SampleGameDescription />}
        suggestions={sampleMixedGridItems()}
      />
    ),
  },
};

export const LoginPage = {
  args: {
    children: <LoginScreen onGithubLogin={() => alert('github login')} />,
  },
};

export const AccountPage = {
  args: {
    connected: true,
    children: (
      <AccountScreen
        recent={Array.from({ length: 5 }).map((_, i) => ({
          type: 'game' as const,
          id: `${i}`,
          name: 'Game ' + i,
        }))}
      />
    ),
  },
};

export const CharityPage = {
  args: {
    children: (
      <CharityScreen
        {...{
          pollUrl: urls.poll,
          charity: {
            ...sampleCharityOrganization,
            imageUrl: '/common/water-org/francisco-hands.jpg',
          },
          pledge: { required: 100, current: 30, games: 7, players: 55 },
          statistics: {
            countries: [
              { name: 'United States', hours: 9 },
              { name: 'India', hours: 5 },
              { name: 'United Kingdom', hours: 3 },
              { name: 'Australia', hours: 2 },
              { name: 'Germany', hours: 2 },
              { name: 'Brazil', hours: 1 },
              { name: 'Canada', hours: 1 },
              { name: 'France', hours: 1 },
            ],
            games: [
              { id: 'puzzle-words', name: 'Puzzle Words', plays: 128 },
              { id: 'word-search', name: 'Word Search', plays: 68 },
              { id: 'emoji-war', name: 'Emoji War', plays: 31 },
              { id: 'solitaire', name: 'Solitaire', plays: 29 },
              { id: 'word-pack', name: 'Word Pack', plays: 28 },
              { id: 'word-smith', name: 'Word Smith', plays: 11 },
              { id: 'nonograms', name: 'Nonograms', plays: 6 },
            ],
            players: {
              new: 45,
              returning: 10,
            },
          },
        }}
      />
    ),
  },
};

export const HelpPage = {
  args: {
    children: <HelpScreen />,
  },
};

export const ReceiptPage = {
  args: {
    children: <ReceiptScreen rows={sampleDonationReceipts} />,
  },
};

export const AboutPage = {
  args: {
    children: <AboutScreen />,
  },
};

export const ContactPage = {
  args: {
    children: <ContactScreen />,
  },
};

export const FAQPage = {
  args: {
    children: <FAQScreen />,
  },
};

export const BlogPage = {
  args: {
    children: <BlogScreen posts={sampleBlogMetadata} />,
  },
};

export const BlogPostPage = {
  args: {
    children: (
      <BlogPostScreen
        metadata={sampleBlogMetadata[0]}
        content={sampleBlogPost}
      />
    ),
  },
};

export const DeveloperPage = {
  args: {
    children: (
      <DeveloperScreen
        name={'Charity Games'}
        socials={dummySocials}
        games={sampleGameDefinitions}
      />
    ),
  },
};

export const UnderConstructionPage = {
  args: {
    children: <UnderConstruction />,
  },
};
