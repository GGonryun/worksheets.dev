import { externalRoutes, routes } from '@worksheets/routes';
import { HelpEmailsQuestions } from '@worksheets/util/enums';
import { copyright } from '@worksheets/util/settings';

const HEADER_IMAGE = `https://cdn.charity.games/_emails/primary.png`;

const SIGNATURE = `❤️ Charity Games<br/>`;

const caption = ({ text }: { text: string }) =>
  `<p style="margin: 0; color: #101112; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; letter-spacing :0px; line-height: 120%; text-align: center; mso-line-height-alt: 16.8px;">${text}</p>`;

const p = ({ text }: { text: string }) =>
  `<p style="margin: 0; color: #101112; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 120%; text-align: left; mso-line-height-alt: 19.2px;">${text}</p>`;

const link = ({ href, text }: { href: string; text: string }) =>
  `<a href="${href}" target="_blank" style="text-decoration: underline; color: #2477f4;" rel="noopener">${text}</a>`;

const h3 = ({ text }: { text: string }) =>
  `<h3 style="margin: 0; color: #000000; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 28.799999999999997px;">
  <span class="tinyMce-placeholder">${text}</span></h3>`;

const replaceLinks = (content: string, links?: TemplateLink[]) => {
  if (!links) {
    return content;
  }
  return links.reduce((acc, l) => {
    const regex = new RegExp(`{{${l.id}}}`, 'g');
    return acc.replace(regex, link(l));
  }, content);
};

type TemplateLink = {
  href: string;
  text: string;
  id: string;
};

export type TemplateOptions = {
  title: string;
  paragraphs: string[];
  links?: TemplateLink[];
  unsubscribe?: string;
};

export const template = ({
  title,
  paragraphs,
  unsubscribe,
  links,
}: TemplateOptions) => {
  const captionText = unsubscribe
    ? `No longer want to receive these emails? ${link({
        href: unsubscribe,
        text: 'Unsubscribe',
      })}`
    : `This is a transactional email from Charity Games. ${link({
        href: routes.help.emails.url({
          bookmark: HelpEmailsQuestions.Description,
        }),
        text: 'Learn more',
      })}`;

  // add signature to the end of the email
  const content = paragraphs.concat(SIGNATURE).join('<br/><br/>');
  // for each link in the links array, scan the content and replace the placeholder with the link
  const paragraph = replaceLinks(content, links);

  return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        @media (max-width:620px) {
            .desktop_hide table.icons-outer {
                display: inline-table !important;
            }

            .social_block.desktop_hide .social-table {
                display: inline-block !important;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
</head>

<body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #efefef;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;"
                                        width="600">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="width:100%;padding-right:0px;padding-left:0px;">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 120px;"><img
                                                                            src="${HEADER_IMAGE}"
                                                                            style="display: block; height: auto; border: 0; width: 100%;"
                                                                            width="120" height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;"
                                        width="600">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="heading_block block-1" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                ${h3({
                                                                  text: title,
                                                                })}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-2" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                ${p({
                                                                  text: paragraph,
                                                                })}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #efefef;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;"
                                        width="600">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:10px;line-height:10px;font-size:1px;">&#8202;
                                                    </div>
                                                    <table class="table_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <table
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; width: 100%; table-layout: fixed; direction: ltr; background-color: transparent; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 400; color: #000000; text-align: center; letter-spacing: 0px;"
                                                                    width="100%">
                                                                    <tbody
                                                                        style="vertical-align: top; font-size: 14px; line-height: 120%;">
                                                                        <tr>
                                                                            <td width="25%"
                                                                                style="padding: 10px; word-break: break-word; border-top: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent; border-left: 1px solid transparent;">
                                                                                <a href="${routes.play.url()}"
                                                                                    target="_blank"
                                                                                    style="text-decoration: underline; color: #2477f4;"
                                                                                    rel="noopener"><span
                                                                                        class="mce-content-body mce-edit-focus"
                                                                                        style="position: relative;"
                                                                                        id="72016450-5ca2-4947-9101-d5db9c2f5693"
                                                                                        data-position="30-0-842a0034-b9c0-4814-bcdf-76d5d1a76641-1-0"
                                                                                        data-qa="tinyeditor-root-element"><span
                                                                                            class="tinyMce-placeholder">PLAY</span></span></a>
                                                                            </td>
                                                                            <td width="25%"
                                                                                style="padding: 10px; word-break: break-word; border-top: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent; border-left: 1px solid transparent;">
                                                                                <a href="${routes.raffles.url()}"
                                                                                    target="_blank"
                                                                                    style="text-decoration: underline; color: #2477f4;"
                                                                                    rel="noopener"><span
                                                                                        class="mce-content-body mce-edit-focus"
                                                                                        style="position: relative;"
                                                                                        id="59ea3afe-4ca7-477a-9080-313c1dc5c033"
                                                                                        data-position="30-0-842a0034-b9c0-4814-bcdf-76d5d1a76641-1-1"
                                                                                        data-qa="tinyeditor-root-element"><span
                                                                                            class="tinyMce-placeholder">WIN</span></span></a>
                                                                            </td>
                                                                            <td width="25%"
                                                                                style="padding: 10px; word-break: break-word; border-top: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent; border-left: 1px solid transparent;">
                                                                                <a href="${routes.help.contributions.url()}"
                                                                                    target="_blank"
                                                                                    style="text-decoration: underline; color: #2477f4;"
                                                                                    rel="noopener"><span
                                                                                        class="mce-content-body mce-edit-focus"
                                                                                        style="position: relative;"
                                                                                        id="8e6b6b6a-40d0-4a7a-bea9-ea9f38f041f8"
                                                                                        data-position="30-0-842a0034-b9c0-4814-bcdf-76d5d1a76641-1-2"
                                                                                        data-qa="tinyeditor-root-element"><span
                                                                                            class="tinyMce-placeholder">GIVE</span></span></a>
                                                                            </td>
                                                                            <td width="25%"
                                                                                style="padding: 10px; word-break: break-word; border-top: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent; border-left: 1px solid transparent;">
                                                                                <a href="${routes.help.url()}"
                                                                                    target="_blank"
                                                                                    style="text-decoration: underline; color: #2477f4;"
                                                                                    rel="noopener"><span
                                                                                        class="mce-content-body mce-edit-focus"
                                                                                        style="position: relative;"
                                                                                        id="51e8f541-8c84-4147-998f-10f3a264d4a5"
                                                                                        data-position="30-0-842a0034-b9c0-4814-bcdf-76d5d1a76641-1-3"
                                                                                        data-qa="tinyeditor-root-element"><span
                                                                                            class="tinyMce-placeholder">FAQ</span></span></a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="divider_block block-3" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation" width="100%"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="divider_inner"
                                                                                style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                <span>&#8202;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="social_block block-4" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <table class="social-table" width="180px" border="0"
                                                                        cellpadding="0" cellspacing="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                                                        <tr>
                                                                            <td style="padding:0 2px 0 2px;"><a
                                                                                    href="${routes.home.url()}"
                                                                                    target="_blank"><img
                                                                                        src="https://cdn.charity.games/_emails/social/website@2x.png"
                                                                                        width="32" height="auto"
                                                                                        alt="Web Site" title="Web Site"
                                                                                        style="display: block; height: auto; border: 0;"></a>
                                                                            </td>
                                                                            <td style="padding:0 2px 0 2px;"><a
                                                                                    href="${
                                                                                      externalRoutes
                                                                                        .social
                                                                                        .facebook
                                                                                    }"
                                                                                    target="_blank"><img
                                                                                        src="https://cdn.charity.games/_emails/social/facebook@2x.png"
                                                                                        width="32" height="auto"
                                                                                        alt="Facebook" title="facebook"
                                                                                        style="display: block; height: auto; border: 0;"></a>
                                                                            </td>
                                                                            <td style="padding:0 2px 0 2px;"><a
                                                                                    href="${
                                                                                      externalRoutes
                                                                                        .social
                                                                                        .twitter
                                                                                    }"
                                                                                    target="_blank"><img
                                                                                        src="https://cdn.charity.games/_emails/social/twitter@2x.png"
                                                                                        width="32" height="auto"
                                                                                        alt="Twitter" title="twitter"
                                                                                        style="display: block; height: auto; border: 0;"></a>
                                                                            </td>
                                                                            <td style="padding:0 2px 0 2px;"><a
                                                                                    href="${
                                                                                      externalRoutes
                                                                                        .social
                                                                                        .linkedIn
                                                                                    }"
                                                                                    target="_blank"><img
                                                                                        src="https://cdn.charity.games/_emails/social/linkedin@2x.png"
                                                                                        width="32" height="auto"
                                                                                        alt="Linkedin" title="linkedin"
                                                                                        style="display: block; height: auto; border: 0;"></a>
                                                                            </td>
                                                                            <td style="padding:0 2px 0 2px;"><a
                                                                                    href="${
                                                                                      externalRoutes
                                                                                        .social
                                                                                        .youtube
                                                                                    }"
                                                                                    target="_blank"><img
                                                                                        src="https://cdn.charity.games/_emails/social/youtube@2x.png"
                                                                                        width="32" height="auto"
                                                                                        alt="YouTube" title="YouTube"
                                                                                        style="display: block; height: auto; border: 0;"></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-5" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                            ${caption({
                                                              text: `${captionText}<br>${copyright} - All rights reserved.`,
                                                            })}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><!-- End -->
</body>
</html>`;
};
