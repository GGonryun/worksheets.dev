import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ListItem, OrderedList, UnorderedList } from '@worksheets/ui-core';
import { QuestionAnswer } from '@worksheets/util/types';

// The redirects to urls with bookmarks aren't triggering a scroll to the bookmark, using a query param forces the page to refresh and scroll to the bookmark
export const contributionFaq: QuestionAnswer[] = [
  {
    id: 'submit-a-game',
    question: 'How do I submit a game?',
    summary: `We support most game engines and frameworks as long as they can be exported to a web build. Make sure that your game is responsive and works across a variety of different screen sizes. The most common of which are 4:3 and 16:9 aspect ratios. For more information on the file formats we support, please refer to the question: "What file formats are supported?"`,
    answer: (
      <Box>
        <Typography>
          <i>
            We appreciate your interest in submitting a game to our platform!
          </i>
          <br />
          <br /> We support most game engines and frameworks as long as they can
          be exported to a web build. Make sure that your game is responsive and
          works across a variety of different screen sizes. The most common of
          which are 4:3 and 16:9 aspect ratios. For more information on the file
          formats we support, please refer to the question:{' '}
          <Link href="#what-file-formats-are-supported">
            "What file formats are supported?"
          </Link>
          .
          <br />
          <br />
          In order to upload one of your games to our platform you must complete
          the following steps:
        </Typography>
        <OrderedList>
          <ListItem>
            Create a developer account by clicking the "Sign Up" button in the
            top right corner of the page or by{' '}
            <Link href="/signup">clicking here</Link>
          </ListItem>
          <ListItem>
            Fill out your profile by clicking on your "Account" button in the
            top right corner of the page or by{' '}
            <Link href="/account">clicking here</Link>
          </ListItem>
          <ListItem>
            Complete and sign the terms of service agreement located on the{' '}
            <Link href="/account/submissions"> submission page.</Link>
          </ListItem>
          <ListItem>
            Create a new game by clicking the "Submit Game" button on your
            profile page or by{' '}
            <Link href="/account/submissions">clicking here.</Link>
          </ListItem>
          <ListItem>
            Follow the instructions on the submission page to upload your game
            and related assets.
          </ListItem>
          <ListItem>
            All submissions are reviewed by our team before being published to
            the platform. You will receive an email when your game has been
            accepted or rejected.
          </ListItem>
        </OrderedList>
        <br />
        <Typography>
          We do our best to play-test and review every game that is submitted to
          us. However, due to the high volume of submissions we receive, we
          cannot guarantee that your game will be accepted.
        </Typography>
      </Box>
    ),
  },
  {
    id: 'how-to-make-changes',
    question: 'How do I make changes to my game?',
    summary: `A game can be edited at any time, but games that have already been submitted and approved will require a review before the changes are published. We recommend making updates to your existing game submission rather than creating a new submission. This will allow you to keep your game's play count and ratings. For more information on how to submit a game, please refer to the question: "How do I submit a game?"`,
    answer: (
      <Box>
        <Typography>
          In order to make changes to your game navigate to your{' '}
          <Link href="/account/submissions">
            game submission section of your account page
          </Link>{' '}
          and click on the game you would like to edit.
          <br />
          <br />
          A game can be edited at any time, but games that have already been
          submitted and approved will require a review before the changes are
          published.
          <br />
          <br />
          We recommend making updates to your existing game submission rather
          than creating a new submission. This will allow you to keep your
          game's play count and ratings.
          <br />
          <br />
          For more information on deleting a game submission or an existing game
          on the platform, please refer to the question:{' '}
          <Link href="#how-to-delete-game">"How do I delete my game?"</Link>
        </Typography>
      </Box>
    ),
  },
  {
    id: 'how-to-delete-game',
    question: 'How do I delete my game?',
    summary: `Deleting a game is a permanent action and cannot be undone. If you would like to remove your game from the platform, please contact us. You must be the owner of the game and you must be contacting us from the email address associated with the account that created the game.`,
    answer: (
      <Typography>
        Deleting a game is a permanent action and cannot be undone. If you would
        like to remove your game from the platform, please{' '}
        <Link>contact us</Link>. You must be the owner of the game and you must
        be contacting us from the email address associated with the account that
        created the game.
      </Typography>
    ),
  },
  {
    id: 'what-file-formats-are-supported',
    question: 'What file formats are supported for submission?',
    summary: `We support most game engines and frameworks as long as they can be exported to a web build. Make sure that your game is responsive and works across a variety of different screen sizes. The most common of which are 4:3 and 16:9 aspect ratios. For more information on submitting a game, please refer to the question: "How do I submit a game?"`,
    answer: (
      <Box>
        <Typography variant="h6" mb={1}>
          Game Files (Web Build)
        </Typography>
        <Typography>
          We support most game engines and frameworks as long as they can be
          exported to a web build. Make sure that your game is responsive and
          works across a variety of different screen sizes. The most common of
          which are 4:3 and 16:9 aspect ratios.
          <br />
          <br />
          For more information on submitting a game, please refer to the
          question: <Link href="#submit-a-game">"How do I submit a game?"</Link>
          <br />
          <br />
          We support the following game engines and frameworks:
        </Typography>
        <OrderedList>
          <ListItem disablePadding>Unity</ListItem>
          <ListItem disablePadding>Unreal Engine</ListItem>
          <ListItem disablePadding>Godot</ListItem>
          <ListItem disablePadding>Construct</ListItem>
          <ListItem disablePadding>Game Maker Studio</ListItem>
          <ListItem disablePadding>Phaser</ListItem>
          <ListItem disablePadding>Three.js</ListItem>
          <ListItem disablePadding>PlayCanvas</ListItem>
          <ListItem disablePadding>Babylon.js</ListItem>
          <ListItem disablePadding>Defold</ListItem>
          <ListItem disablePadding>Native JavaScript</ListItem>
          <ListItem disablePadding>and more!</ListItem>
        </OrderedList>
        <Typography>
          For more information on how to export your game to a web build, please
          refer to the documentation for your game engine or framework.
          <br />
          <br />
          Once you have exported your game to a web build, you will need to
          compress the files into a single zip file.{' '}
          <b>We only support .zip files</b>. We do not support .rar, .7z, or any
          other compression format.
          <br />
          <br />
          If you are having trouble exporting your game to a web build, please{' '}
          <Link href="/contact">contact us</Link> and we will do our best to
          help you.
        </Typography>
        <br />
        <br />
        <Typography variant="h6" mb={1}>
          Game Assets
        </Typography>
        <Typography>
          All games are required to have a thumbnail image and a cover image.
          <br />
          <br />
          We support the following image formats:
        </Typography>
        <UnorderedList>
          <ListItem disablePadding>
            <b>.jpg</b>
          </ListItem>
          <ListItem disablePadding>
            <b>.jpeg</b>
          </ListItem>
          <ListItem disablePadding>
            <b>.png</b>
          </ListItem>
          <ListItem disablePadding>
            <b>.gif</b>
          </ListItem>
        </UnorderedList>
        <br />
        <Typography>
          <b>Thumbnail Image</b>
          <br />
          Your games thumbnail image is shown on the game card and on the game
          loading screen. It should be a square image with a minimum resolution
          of 300x300 pixels.
          <i> We recommend using a resolution of 512x512 pixels.</i>
          <br />
          <br />
          <b>Cover Image</b>
          <br />
          The cover image is very important. It is used in a wide variety of
          situations across the platform and outside of the platform.
          <br />
          <br />
          The resolution of the cover image is very important. If the image is
          too small, it will appear blurry and pixelated. If the image is too
          large, it will take longer to load and will not be displayed properly.
          <br />
          <br />
          It should be a landscape image with a minimum resolution of 1280x720
          pixels. <i> We recommend using a resolution of 1920x1080 pixels.</i>
          <br />
          <br />
          The cover image is used in the following situations:
        </Typography>
        <OrderedList>
          <ListItem disablePadding>
            Used on the home page for promoted games
          </ListItem>
          <ListItem disablePadding>
            Used on the game page as a loading screen
          </ListItem>
          <ListItem disablePadding>
            Used when sharing your game on social media platforms like X
            (formerly known as Twitter), Discord, Facebook, Instagram and more.
          </ListItem>
          <ListItem disablePadding>
            Used for promotional purposes on our social media platforms or with
            our partners.
          </ListItem>
        </OrderedList>
      </Box>
    ),
  },
  {
    id: 'what-makes-a-quality-game',
    question: 'What makes a quality game?',
    summary: `It depends. We review every game that is submitted to our platform. We do our best to play-test and review every game that is submitted to us. However, due to the high volume of submissions we receive, we cannot guarantee that your game will be accepted. For more information on submitting a game, please refer to the question: "How do I submit a game?"`,
    answer: (
      <Box>
        <Typography>
          A quality game is a game that is fun to play and adheres to our{' '}
          <Link href="/terms">terms of service</Link>.
          <br />
          <br />
          Our contribution standards are based on the following criteria:
        </Typography>
        <OrderedList>
          <ListItem>The game should be fun to play.</ListItem>
          <ListItem>
            The game has unique art and sound assets. It should contain no more
            than 20% of assets that are available in the public domain and it
            should contain no more than 80% of assets that are generated using
            artificial intelligence.
          </ListItem>
          <ListItem>
            The game mechanics are original and not a direct clone of another
            game on our platform. We look for games that contain some level of
            originality and creativity.
          </ListItem>
          <ListItem>
            The game should be responsive and work across a variety of different
            screen sizes. The most common of which are 4:3 and 16:9 aspect
            ratios.
          </ListItem>
          <ListItem>
            The games user interface should be intuitive and easy to use. It
            should not feature any broken links or buttons.
          </ListItem>
          <ListItem>
            Sound should be using sparingly and should not be annoying or
            repetitive. It should be easy to mute your game sound. We prefer
            games that let players opt into sound rather than opt out of sound.
          </ListItem>
          <ListItem>
            The game should be free of bugs and should not crash or freeze
            during game play. We recommend play-testing your game on a variety
            of different devices and browsers before submitting your game.
          </ListItem>
        </OrderedList>
        <Typography>
          Failing to adhere to the above standards does not guarantee that your
          game will be rejected.
          <br />
          <br />
          We personally review every game that is submitted to our platform. We
          do our best to play-test and review every game that is submitted to
          us. However, due to the high volume of submissions we receive, we
          cannot guarantee that your game will be accepted.
        </Typography>
      </Box>
    ),
  },
];
