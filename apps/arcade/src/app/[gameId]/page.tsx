import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { GameLdJson } from '@worksheets/ui/components/seo';
import {
  GameScreenContainer,
  GameScreenContainerProps,
} from '@worksheets/ui/pages/game';
import { Boundary } from '@worksheets/ui/suspense/server';
import { notFound } from 'next/navigation';

export type GamePageProps = { params: { gameId: string } };

const getStaticProps = async (
  gameId: string
): Promise<GameScreenContainerProps> => {
  try {
    const trpc = await createStaticTRPC();
    const { game, developer } = await trpc.public.games.find.fetch({
      gameId,
    });

    return {
      game,
      developer,
    };
  } catch (error) {
    return notFound();
  }
};

export async function generateMetadata({ params }: GamePageProps) {
  const { game, developer } = await getStaticProps(params.gameId);
  return {
    title: game.name,
    description: `Play ${game.name} by ${developer.name} online for free on Charity Games. ${game.name} is one of our top ${game.categories[0]} games. `,
    images: [
      {
        url: game.bannerUrl,
        alt: game.name,
      },
    ],
  };
}

export async function generateStaticParams() {
  const trpc = await createStaticTRPC();
  const games = await trpc.public.games.list.fetch({});

  return games.map((game) => ({
    gameId: game.id,
  }));
}

export default async function Page({ params }: GamePageProps) {
  const props = await getStaticProps(params.gameId);

  return (
    <Boundary>
      <GameScreenContainer {...props} />
      <GameLdJson {...props} />
    </Boundary>
  );
}
