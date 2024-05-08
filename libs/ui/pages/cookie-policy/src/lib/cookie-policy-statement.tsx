import { Markdown } from '@worksheets/ui-core';
import { printDate } from '@worksheets/util/time';

export const CookiesStatement = () => {
  return (
    <Markdown
      text={cookiesText}
      sx={{
        fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
      }}
    />
  );
};

const createdAtDate = printDate('12-01-2023');
const updatedAtDate = printDate('05-06-2024');

const cookiesText = `
# Global Cookie Policy
**Released**: ${createdAtDate}
<br/>
**Last Updated**: ${updatedAtDate}
## What are cookies?
Cookies are small files that are saved on your computer when you visit web pages. They contain information linked to a web browser and the specific website. They are saved in a specific folder on your hard drive. If you return to a specific website, this page can recognize the visitor by means of the cookie and further elaborate the history. A web beacon is an (often transparent) graphic image, usually no larger than 1 pixel, that is placed on a website and that is used to monitor the behavior of the user visiting the website.
<br/><br/>
Cookies are used to increase visitor-friendliness: by identifying visitors with a cookie, they do not always have to enter the same data such as login information or screen settings every time you visit the website.

## Which kind of cookies exist?
Often a distinction is made between two large groups of cookies:
<br/><br/>
First party cookies: these cookies are created by a website to have the web page function better. They regulate the technical part of a site, such as language choice or remembering the products in the shopping basket in an online store. The visited website creates and places first party cookies.
<br/><br/>
Third party cookies: these cookies are created and placed on your computer by another (third) party than the website you visit. They remember the behavior of a surfer. Examples are social media such as Facebook or Twitter, but Google Analytics as well. This is the system used most to measure website visits.
<br/><br/>
Cookies required for the correct functioning of the Site do not require permission. All other cookies do.
<br/><br/>
## Which cookies do we use?
We will only use first party cookies to help improve your user experience on the Site. We would do this by recording specific information about the user such as the language chosen, the pages visited and the duration of the visits.
<br/><br/>
We may offer games from third-party game distributors on our portal. By playing a third-party game, your Personal Data may be processed by the third-party game distributor (directly or through the use of cookies or similar technology). Please note that if you choose to play a third-party game, you are playing that game in the environment of that game's third-party developer, over which we have no control. We, therefore, recommend that you read the privacy statement of that game distributor before playing the game.
<br/><br/>
Game Monetize: [Privacy Policy](https://gamemonetize.com/privacypolicy)
<br/><br/>
Your acceptance of this Privacy Policy by using the Site, entails that third parties may drop cookies and/or use web beacons for advertising and tracking purposes.
<br/><br/>
Third parties might use information gathered by cookies and/or web beacons for the purpose of online behavioral advertising and/or multi-site advertising. The types of information that is gathered by third party cookies and/or web beacons as well as the purpose(s) for which this information is used, are set out in the privacy policy of said third parties which Charity Games encourages you to review. Charity Games declines all and any liability for any third party cookies or web beacons deployed by third parties for whatever purpose.
<br/><br/>
The Site may therefore use third party cookies such as cookies from:
<br/><br/>
Google Ad Exchange — [Privacy Policy](https://policies.google.com/privacy)
<br/>
Google Adsense — [Privacy Policy](https://policies.google.com/privacy)
<br/>
FullStory — [Privacy Policy](https://www.fullstory.com/legal/privacy-policy/)
<br/><br/>
In addition, the Site also uses third party cookies such as cookies from Google Analytics.
<br/><br/>
Google Analytics is a free service by Google to collect statistics of websites and to represent them in detail. The website administrator thus has a clear view on visitor flows, traffic flows and page displays. This way it is possible to adapt parts of a website or complete websites to the behavior and interests of the visitors.
## How to manage cookies?
You can do so by adapting your browser settings. Modern browsers allow you to choose to block cookies or to accept only cookies from specific websites. Contact us if you need any help in doing so.
<br/><br/>
Cookie settings website.

## Opt-out
In certain jurisdictions we use certain analytical cookies, advertising cookies, and/or marketing cookies unless you opt out of these cookies.

## Opt-in
In other jurisdictions — for example the member states of the EU and UK — we need your consent for the use of certain analytical cookies and/or advertising cookies. In case you are located in one of these jurisdictions, you can provide your consent or amend your cookie settings by using the links below:
<br/><br/>
[GDPR Cookie Consent](/cookies?fc=alwaysshow&fctype=gdpr)
<br/>
[CPRA Cookie Consent](/cookies?fc=alwaysshow&fctype=ccpa)
<br/><br/>

Your precise geolocation and information about your device characteristics can be used to ensure that the content and advertisements that are presented to you are relevant to you. Advertisement and content performance can be measured and can be personalized based on a profile. Data can be used to build or improve user experience, systems and software; and whether
cookies, device identifiers, or other information can be stored or accessed on your device for the purposes presented to you.

## General Website Functionality
If you choose to block or delete certain cookies, it is possible the Charity Games website or functions on our website do not work properly anymore. Deleting or refusing cookies also does not mean you will no longer see advertisements. However, as a result of disabling cookies, the advertisements shown may be less relevant to you.

## How to change or delete cookie settings in your browser
For your convenience we included links on how to change cookie settings on the most used internet browsers:
<br/><br/>
[How to change cookies setting in Google Chrome](https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=en)
<br/>
[How to change cookies setting in Microsoft Edge](https://support.microsoft.com/en-us/microsoft-edge/view-cookies-in-microsoft-edge-a7d95376-f2cd-8e4a-25dc-1de753474879)
<br/>
[How to change cookies setting in Safari](https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac)
<br/>
[How to change cookies setting in Mozilla Firefox](https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer)
<br/>
[How to change cookies setting in Opera](https://help.opera.com/en/latest/web-preferences/)

## More information
We care about your privacy! Please consider carefully which web browser you use. Some browsers may benefit from sharing your personal data, while others are completely independent. We advise you to research the available web browsers and decide for yourself which browser best suits your interests. Please visit [www.whatismybrowser.com](www.whatismybrowser.com) for information on the browser you use and more information on other browsers and browser settings.
`;
