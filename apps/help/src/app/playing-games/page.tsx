import { helpPlayingGames } from '@worksheets/ui/components/help';
import { FAQPageLdJson } from '@worksheets/ui/components/seo';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { Boundary } from '@worksheets/ui/suspense/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Games',
  description:
    'Find answers to questions about playing games on Charity Games. Learn how to play games and earn rewards.',
};

export default async function Page() {
  return (
    <Boundary>
      <HelpScreen
        title={'Playing Games'}
        description={
          'Playing games is a great way to earn points and rewards. We have a variety of games to choose from, including puzzles, arcade games, and more.'
        }
        qa={helpPlayingGames}
      />
      <FAQPageLdJson qa={helpPlayingGames} />
    </Boundary>
  );
}
