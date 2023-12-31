import type { Meta } from '@storybook/react';
import { Layout } from './layout';
import { Container, Typography } from '@mui/material';
import {
  dummySocials,
  sampleAuthor,
  sampleBlogMetadata,
  sampleBlogPost,
  sampleCategoryDescription,
  sampleCategoryItems,
  sampleCharityOrganization,
  sampleGameDefinitions,
  sampleGameItems,
  sampleGamePopularityStatistics,
  sampleMixedGridItems,
  sampleRecommendations,
} from '@worksheets/ui/mocks';
import { MixedGrid } from '@worksheets/ui/game-grid';
import { CategoryScreen } from '@worksheets/ui/pages/category';
import {
  GameScreen,
  SampleGameDescription,
  SampleGameLauncher,
} from '@worksheets/ui/pages/game';
import { AccountScreen } from '@worksheets/ui/pages/account';
import { LoginScreen } from '@worksheets/ui/pages/login';
import { CharityScreen } from '@worksheets/ui/pages/charity';
import { HelpScreen } from '@worksheets/ui/pages/help';
import {
  ReceiptScreen,
  sampleDonationReceipts,
} from '@worksheets/ui/pages/receipts';
import { AboutScreen } from '@worksheets/ui/pages/about';
import { BlogScreen, BlogPostScreen } from '@worksheets/ui/pages/blog';
import { ContactScreen } from '@worksheets/ui/pages/contact';
import { CookiePolicyScreen } from '@worksheets/ui/pages/cookie-policy';
import { DeveloperScreen } from '@worksheets/ui/pages/developer';
import { FAQScreen } from '@worksheets/ui/pages/faq';
import { PrivacyPolicyScreen } from '@worksheets/ui/pages/privacy-policy';
import { UnderConstruction } from '@worksheets/ui/pages/under-construction';
import { RecentGamesSection } from './recent-games-section';
import { action } from '@storybook/addon-actions/*';

const Story: Meta<typeof Layout> = {
  component: Layout,
  title: 'Layout/WebsiteLayout',
  args: {
    onSearch: async () => {
      return { games: [], categories: [] };
    },
    onRandomGame: () => {
      alert('random game');
    },
    recommendations: sampleRecommendations,
    recentGamesSection: (
      <RecentGamesSection recent={sampleRecommendations.new} />
    ),
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
    recentGamesSection: <RecentGamesSection recent={[]} />,
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
    recentGamesSection: <RecentGamesSection recent={[]} />,
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
    children: <LoginScreen onGithubAction={() => alert('github login')} />,
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
        onLogout={action('onLogout')}
      />
    ),
  },
};

export const CharityPage = {
  args: {
    children: (
      <CharityScreen
        {...{
          charity: sampleCharityOrganization,
          pledge: { required: 100, current: 30 },
          statistics: sampleGamePopularityStatistics,
        }}
      />
    ),
  },
};

export const HelpPage = {
  args: {
    children: <HelpScreen qa={[]} />,
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
    children: <FAQScreen faq={[]} bookmark="" />,
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
        author={sampleAuthor}
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
        description={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
        avatarUrl={'/common/charity-games/logos/quaternary-small.png'}
      />
    ),
  },
};

export const PrivacyPolicyPage = {
  args: {
    children: <PrivacyPolicyScreen />,
  },
};

export const CookiePolicyPage = {
  args: {
    children: <CookiePolicyScreen />,
  },
};

export const UnderConstructionPage = {
  args: {
    children: <UnderConstruction />,
  },
};
