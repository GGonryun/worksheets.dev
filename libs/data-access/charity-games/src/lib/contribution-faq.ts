import { QuestionAnswer } from '@worksheets/util/types';
import urls from '@worksheets/util/urls';

// The redirects to urls with bookmarks aren't triggering a scroll to the bookmark, using a query param forces the page to refresh and scroll to the bookmark
export const contributionFaq: QuestionAnswer[] = [
  {
    id: 'submit-a-game',
    question: 'How do I submit a game?',
    answer: `In order to upload one of your games you must complete the following steps:
      <br/>
      <br/>
      1. Gather the required files for your game. You will need a **web build of your game files**, a **cover (banner) image**, a **thumbnail image**, and a **developer logo**.
      <br/>
      2. For more information on the required files, please read the [file format section below](/contribute?#what-file-formats-are-supported).
      <br/>
      3. Compress all of your files into a single zip file.
      <br/>
      4. Upload your game to a file sharing service such as [Google Drive](https://drive.google.com), [Dropbox](https://www.dropbox.com), or [OneDrive](https://onedrive.live.com).
      <br/>
      5. Navigate to the [game submission page](/contribute/submit).
      <br/>
      6. Fill out the form and press submit.
      <br/>
      7. Once approved, your game will be available for everyone to play.
      <br/>
      <br/>
      If you have any questions or issues with the submission process, please contact us at [${urls.email.admin}](mailto:${urls.email.admin}).
      <br/>
      <br/>
      If you need to make changes to your game after it has been submitted, please read the [how to make changes section below](/contribute?#how-to-make-changes).
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
    answer: `
    In order to delete your game you will need your **developer id** and **game id**. These would are provided to you after submitting a game to the platform. Alternatively, you can find these on your developer profile page if you have lost them.
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
      <p>We support most game engines and frameworks as long as they can be exported to a **web build**. Make sure that your game is **responsive** and works across a variety of different screen sizes. The most common of which are 4:3 and 16:9 aspect ratios.</p>
      <p>We support games made with the following frameworks:</p>
      <ul>
        <li>Unity</li>
        <li>Unreal</li>
        <li>JavaScript</li>
        <li>Phaser</li>
        <li>Construct</li>
        <li>Godot</li>
        <li>GameMaker</li>
        <li>Defold</li>
        <li>and more...</li>
      </ul>
      <p>For more information on how to export your game to a web build, please refer to your game engine's documentation.</p>
      <p>Once you have exported your game to a web build, you will need to compress all of the files into a single zip file. **We only support zip files**. We do not support rar, 7z, or other compression formats.</p>
      <p>If you are having trouble with the submission process, please [contact us](/contact).</p>
  
      <h3>__Cover Image__</h3>
      <p>Your game's cover image is used as the loading screen and when sharing your game on social platforms like X (formerly known as Twitter), Discord, Facebook, Instagram, and more.</p>
      <p>The image should be 4:3 or 16:9 aspect ratio and **at least 500 pixels tall** in size. We recommend using a 1920x1080 image. We support the following image formats: JPEG, JPG, PNG, and GIF.</p>

      <h3>__Thumbnail Image__</h3>
      <p>Your game's thumbnail is shown on the game's play page and on the games page. It is also the key image used to promote your games on other platforms.</p>
      <p>It should be a square image and at least **300x300 pixels** in size. We recommend using a 512x512 image. We support the following image formats: JPEG, JPG, PNG, and GIF.</p>

      <h3>__Developer Logo__</h3>
      <p>Your developer logo is shown on your developer profile page and on the game's play page.</p>
      <p>It should be a square image and at least **300x300 pixels** in size. We recommend using a 512x512 image. We support the following image formats: JPEG, JPG, PNG, and GIF.</p>
      `,
  },
];
