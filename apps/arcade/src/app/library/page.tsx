import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { LibraryScreen, LibraryScreenProps } from '@worksheets/ui/pages/game';
import { Boundary } from '@worksheets/ui/suspense/server';
import { Metadata } from 'next';

const getStaticProps = async (): Promise<LibraryScreenProps> => {
  const trpc = await createStaticTRPC();
  const games = await trpc.public.games.library.fetch();
  const categories = await trpc.public.categories.list.fetch({
    showEmpty: false,
  });

  return {
    games,
    categories,
  };
};

export const metadata: Metadata = {
  title: 'All Games',
  description:
    'Find and play your favorite mobile and desktop games for free on Charity Games. The easiest way to donate to charity.',
};

export default async function Page() {
  const data = await getStaticProps();
  return (
    <Boundary>
      <LibraryScreen {...data} />
    </Boundary>
  );
}
