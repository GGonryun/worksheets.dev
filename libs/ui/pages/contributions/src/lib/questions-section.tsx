import Paper from '@mui/material/Paper';
import { TitleText } from './title-text';
import Box from '@mui/material/Box';
import {
  QuestionAnswer,
  QuestionAnswerSection,
} from '@worksheets/ui/qa-section';
import { useRouter } from 'next/router';
import urls from '@worksheets/util/urls';

export const QuestionsSection = () => {
  const { asPath } = useRouter();
  const bookmark = asPath.split('#').at(-1);
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          gap: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <TitleText variant="h2" textAlign="center">
          Frequently Asked Questions
        </TitleText>
        <QuestionAnswerSection
          qa={qa}
          bookmark={bookmark}
          markdownSx={{
            whiteSpace: 'normal',
            p: {
              margin: 0,
              padding: 0,
            },
          }}
        />
      </Paper>
    </Box>
  );
};

const qa: QuestionAnswer[] = [
  {
    id: 'submit-a-game',
    question: 'How do I submit a game?',
    answer: `In order to upload one of your games you must complete the following steps:
    <br/>
    <br/>
    1. Gather the required files for your game. This includes a **web build of your game files**, a **cover (banner) image**, and a **thumbnail image**, and a **developer logo**.
    <br/>
    2. For more information on the required files, please read the [file format section below](#what-file-formats-are-supported).
    <br/>
    3. Compress all of your files into a single zip file.
    <br/>
    4. Navigate to the [game submission page](/contribute/game-submission).
    <br/>
    5. Fill out the form and press submit.
    <br/>
    6. Once approved, your game will be available for everyone to play.
    <br/>
    <br/>
    If you have any questions or issues with the submission process, please contact us at [${urls.email.admin}](mailto:${urls.email.admin}).
    <br/>
    <br/>
    If you need to make changes to your game after it has been submitted, please read the [how to make changes section below](#how-to-make-changes).
    `,
  },
  {
    id: 'how-to-make-changes',
    question: 'How do I make changes to my game?',
    answer: `In order to delete your game you will need your **developer id** and **game id**. These would have been provided to you after submitting your game to the platform. Alternatively, you can find these on your **developer profile page** if you have lost them.
    <br/>
    <br/>
    1. Your developer id can be found on your developer profile page. It will be in the format of "https://charity.games/developers/<YOUR_DEVELOPER_ID>"
    <br/>
    2. Your game id can be found on the game's play profile page. It will be in the format of "https://charity.games/play/<YOUR_GAME_ID>".
    <br/>
    3. You can find the game's play page by searching for your game on the [games page](/play) or your developer profile page.
    <br/>
    <br/>
    Once you have your developer id and game id, you can make changes to your game by send an email to [${urls.email.admin}](mailto:${urls.email.admin}) with the following information:
    <br/>
    <br/>
    1. Your developer id.
    <br/>
    2. Your game id.
    <br/>
    3. The changes you would like to make.
    <br/>
    <br/>
    You __must__ contact us using the email address associated with your developer account. If you do not have access to this email address, and you have lost your developer id, you will need to provide us with proof of ownership of the game. Contact us at [${urls.email.admin}](mailto:${urls.email.admin}) for more information.
    `,
  },
  {
    id: 'how-to-delete-game',
    question: 'How do I delete my game?',
    answer: `In order to delete your game you will need your **developer id** and **game id**. These would have been provided to you after submitting your game to the platform. Alternatively, you can find these on your developer profile page if you have lost them.
    <br/>
    <br/>
    1. Your developer id can be found on your developer profile page. It will be in the format of "https://charity.games/developers/<YOUR_DEVELOPER_ID>"
    <br/>
    2. Your game id can be found on the game's play page. It will be in the format of "https://charity.games/play/<YOUR_GAME_ID>"
    <br/>
    3. You can find the game's play page by searching for your game on the [games page](/play) or your developer profile page.
    <br/>
    <br/>
    You __must__ contact us using the email address associated with your developer account. If you do not have access to this email address, and you have lost your developer id, you will need to provide us with proof of ownership of the game. Contact us at [${urls.email.admin}](mailto:${urls.email.admin}) for more information.
    `,
  },
  {
    id: 'what-file-formats-are-supported',
    question: 'What file formats are supported for submission?',
    answer: `
    <h3>__Game Files (Web Build)__</h3>
    <p>We support most game engines and frameworks as long as they can be exported to a web build.</p>

    <h3>__Cover Image__</h3>
    <h3>__Thumbnail Image__</h3>
    <h3>__Developer Logo__</h3>
    `,
  },
];
