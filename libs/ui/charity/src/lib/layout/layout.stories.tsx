import type { Meta } from '@storybook/react';
import { Layout } from './layout';
import { Container, Typography } from '@mui/material';
import { MixedGrid } from '../games/mixed-grid';
import {} from '../content/game-screen';
import {
  SampleGameDescription,
  SampleGameLauncher,
  sampleMixedGridItems,
} from '../util';
import { GameScreen, LoginScreen, AccountScreen } from '../content';

const Story: Meta<typeof Layout> = {
  component: Layout,
  title: 'Layout/WebsiteLayout',
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
            if (i % 23 === 4 || i % 23 === 17) {
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

export const CategoriesPage = {
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
      <Container maxWidth="lg" disableGutters sx={{ py: 2 }}>
        <GameScreen
          game={<SampleGameLauncher />}
          description={<SampleGameDescription />}
          suggestions={sampleMixedGridItems()}
        />
      </Container>
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
