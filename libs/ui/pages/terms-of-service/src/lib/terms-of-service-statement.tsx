import { emailRoutes } from '@worksheets/routes';
import { Markdown } from '@worksheets/ui-core';
import { printDate } from '@worksheets/util/time';

export const TermsOfServiceStatement = () => {
  return (
    <Markdown
      text={tosStatement}
      sx={{
        fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
      }}
    />
  );
};

const createdAtDate = printDate('06-18-2024');
const updatedAtDate = printDate('06-18-2024');

const tosStatement = `
# Terms of Use
**Released**: ${createdAtDate}
<br/>
**Last Updated**: ${updatedAtDate}
<br/>
<br/>
Welcome to Charity.Games (Charity Games, LLC is company established in the United States — referred to as "Charity Games", "We", "Our" or "Us"!) 
<br/>
<br/>
These terms and conditions outline the rules and regulations for the use of Charity.Games's Website, located at https://charity.games. Our website is a platform for users to create and participate in charitable gaming and fundraising events, our website includes all domains, subdomains, and subdirectories of https://charity.games. (For a comprehensive review of all covered domains view our sitemap at https://charity.games/sitemap.xml). The Charity Games website may include access to third party content, services, and websites that are not owned or operated by Charity Games, as well as downloadable software or applications for use on personal computers, tablets, mobile devices, or phones.
<br/>
<br/>
Please read these Terms of Use carefully before using the https://charity.games website operated by Charity Games. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
<br/>
<br/>
We may update these Terms of Use from time to time. We will notify you of any changes by posting the new Terms of Use on this page. You are advised to review these Terms of Use periodically for any changes. Changes to these Terms of Use are effective when they are posted on this page.

## Age
By accessing or using Charity Games websites and services you attest that you are at least 16 years of age. If you are under 16 years of age you may not access or use Charity Games websites or services. 
<br/>
<br/>
We do not knowingly collect personally identifiable information from anyone under the age of 16. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers. See our [Privacy Policy](https://charity.games/privacy) for more information.

## Use of this Website

You agree to use this site only for lawful purposes:
<br/>
<br/>
(a) Specifically you do not use this site for any of the following purposes which are expressly prohibited: (1) upload any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable; (2) use this site to violate the legal rights including the rights of privacy of others or to violate laws of any jurisdiction; (3) intercept or attempt to intercept electronic mail that is not intended for you; (4) misrepresent an affiliation with any person; (5) upload or transmit any files containing viruses or other harmful computer code; (6) upload, transmit or otherwise make available any material that contains software or other material protected by intellectual property laws, rights of privacy or publicity or any other applicable law. (7) transmit or upload any material that contains viruses, trojan horses, worms, time bombs, cancelbots, or any other harmful or deleterious programs; (8) interfere with or disrupt the site or networks connected to the site, or disobey any requirements, procedures, policies or regulations of networks connected to the site; (9) engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Charity Games website, or which, as determined by Charity Games, may harm us or our visitors or expose them to liability; (10) impersonate any person or entity, including, but not limited to, a Charity Games official, forum leader, guide or host, or falsely state or otherwise misrepresent your affiliation with a person or entity; (11) forge headers or otherwise manipulate identifiers in order to disguise the origin of any content transmitted through the site; (12) upload, post, email, transmit or otherwise make available any unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation; (13) disrupt the normal flow of dialogue, cause a screen to "scroll" faster than other users of the site are able to type, or otherwise act in a manner that negatively affects other users' ability to engage in real time exchanges; (14) interfere with or disrupt the site or servers or networks connected to the site, or disobey any requirements, procedures, policies or regulations of networks connected to the site; (15) "stalk" or otherwise harass another; or (16) collect or store personal data about other users. Without limiting any of the foregoing, you also agree to abide by any code of conduct and policies applicable to the Charity Games website or any service available on our website.
<br/>
<br/>
All content and/or opinions uploaded, expressed or submitted to a message board, blog, chatroom or any other publicly available section of the Charity Games website (including password-protected areas), and all articles and responses to questions, other than the content provided by Charity Games, are solely the opinions and responsibility of the person or entity submitting them and do not necessarily reflect the opinions of Charity Games. Charity Games is not responsible for content that third parties publish, post, upload, distribute, disseminate or otherwise transmit via the Charity Games website. Charity Games does not and cannot review all content posted to the Charity Games website by users and is not responsible for such content. However, Charity Games reserves the right to refuse to post and the right to remove any content, in whole or in part, for any reason or for no reason. You are responsible for whatever content you submit, and you, not Charity Games, have full responsibility for such content, including its legality, reliability and appropriateness.
<br/>
<br/>
Except when expressly authorized by Charity Games, you agree not to reproduce, modify, rent, lease, loan, sell, distribute, mirror, frame, republish, download, transmit, or create derivative works of the content of others, in whole or in part, by any means. You must not modify, decompile, or reverse engineer any software Charity Games discloses to you, and you must not remove or modify any copyright.
<br/>
<br/>
Charity Games reserves the right to investigate and take appropriate legal action against anyone who, in Charity Games's sole discretion, violates this provision, including without limitation, reporting you to law enforcement authorities. In addition, Charity Games may, in its sole discretion, remove or disable access to any content, or suspend or terminate any account, associated with any user who violates this provision or any other provision of these Terms of Use. Your failure to comply with the provisions above may result in the termination of your access to the site and may expose you to civil and/or criminal liability. 

## Privacy
For information about Charity Games's data protection practices, please read Charity Games's [Privacy Policy](https://charity.games/privacy). This policy explains how Charity Games treats your personal information, and protects your privacy, when you use the Charity Games website. You agree to the use of your data in accordance with Charity Games's Privacy Policy.

## Uploads to your devices

If you are using downloadable applications from Charity Games, updates to your device's systems or firmware may render your use of our applications incompatible. Charity Games does not warrant that our website or any of our applications will be compatible with any updates to, or prior versions of, your devices. Charity Games may, but is not obligated to, provide updates to our applications that are compatible with updates to your devices.

## Data Charges

To the extent that your use of the Charity Games website or any of our applications requires, or permits utilization of, wireless, cellular data, or internet access, you are independently responsible for securing the necessary data access service. Charity Games is not responsible for any data charges you incur. You are responsible for any costs you incur to access the Charity Games website through any wireless or other communication service.

## Access and Interference
You agree that you will not use any robot, spider, or other automatic device, process or means to access the Charity Games website, use any manual process to monitor or copy any material on this website or for any other unauthorized purpose without prior written consent of Charity Games, use any device, software, or function that interferes with the proper working of the Charity Games website, attempt to interfere with the proper working of the Charity Games website, or take any action that imposes an unreasonable or disproportionately large load on Charity Games's infrastructure. You agree that you will not copy, reproduce, alter, modify, create derivative works, or publicly display any content (except for your own personal, non-commercial use, or content you explicitly own) from the Charity Games website without the prior written consent of Charity Games.

## Trademarks
The Charity Games name and logo, and all related names, logos, product and service names, designs and slogans are trademarks of Charity Games or its affiliates or licensors. You must not use such marks without the prior written permission of Charity Games. All other names, logos, product and service names, designs and slogans on this website are the trademarks of their respective owners.

## Interaction with other users
By accessing the Charity Games website, you release us (and our shareholders, partners, affiliates, directors, officers, subsidiaries, employees, agents, suppliers, third party providers, licensors, licensees, distributors and contractors) from claims, demand and damages of every kind and nature arising out of or in any way connected with any dispute you may have with any other user of the Charity Games website. Charity Games will have the right, but not the obligation, to resolve disputes between users relating to use of the Charity Games website, and to the extent that Charity Games elects to resolve such disputes, it will do so in good faith based solely on the general rules and standards of the Charity Games website and will not make judgments regarding legal issues or claims. Charity Games's resolution of such disputes will be final with respect to the Charity Games website, but will have no bearing on any real-world legal disputes in which users of the Charity Games website may become involved. You agree that you will not involve Charity Games in any litigation or other dispute arising out of or related to any transaction, agreement, or arrangement with any other user of the Charity Games website. If you attempt to do so, (1) you shall pay all costs and attorneys' fees of Charity Games and its affiliates incurred in connection with such attempt to involve Charity Games; and (2) the jurisdiction for any such litigation or dispute shall be limited as set forth in the "Governing Law" section below.

## Comments, complaints, reviews, and questions
Charity Games welcomes your feedback about the Charity Games website. However, any comments, ideas, notes, messages, suggestions or other communications (collectively, "comments") sent to Charity Games shall be and remain the exclusive property of Charity Games. Your submission of any such comments shall constitute an assignment to Charity Games of all worldwide rights, titles and interests in all copyrights.

## Links to other websites
The Charity Games website contains links to other websites that are not owned or controlled by Charity Games. Charity Games has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party websites. In addition, Charity Games will not and cannot censor or edit the content of any third-party site. By using the Charity Games website, you expressly relieve Charity Games from any and all liability arising from your use of any third-party website. Accordingly, we encourage you to be aware when you leave the Charity Games website and to read the terms and conditions and privacy policy of each other website that you visit.

## Embedded content from other websites
Charity Games allows other websites to iframe portions of the websites content. Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website. These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website. Charity Games is not responsible for any data collected by third party websites. We reserve the right to remove any embedded content from third party websites at any time.  
<br/>
<br/>
It is strictly forbidden to:
- reproduce, duplicate, copy, sell, resell or exploit any portion of any iframed content;
- remove, hide, or in any hinder the viewability of any copyright, trademark, or proprietary rights notice from the iframed portion of the site;
- remove, block, hide, or in any hinder the viewability of any Charity Games branding, logo, or other Charity Games intellectual property from the iframed portion of the site;
- use Charity Games's name, logo, or other Charity Games intellectual property in any way that would imply Charity Games's endorsement of your website or product;
- add layers, overlays, or other elements to the iframed portion of the site that would imply Charity Games's endorsement of your website or product;
<br/>
If you have any questions about these linking policies you may contact us at [${emailRoutes.support}](mailto:${emailRoutes.support}).

## Accounts
When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms of Use, which may result in immediate termination of your account on our Service. Site visitors may make available certain materials (materials known as "submissions", "games", or "contributions") through or in connection with the Charity Games website. All submissions, games, and contributions are subject to the following terms and conditions outlined in this Terms of Use agreement. 
<br/>
<br/>
You are solely responsible for your contributions to the Charity Games website. You assume all risks associated with use of your contributions, including any reliance on its accuracy, completeness or usefulness by others, or any disclosure of your contributions that makes you or any third party personally identifiable. If you choose to expose any of your personal information through your contributions, that information will be considered public information and the protections of our [Privacy Policy](https://charity.games/privacy) will not apply.

## Licensing
You retain ownership of your contributions, but by making a contribution to the Charity Games website, you hereby grant Charity Games a worldwide, irrevocable, perpetual, non-exclusive, transferable, royalty-free license, with the right to sublicense, to use, copy, distribute, license, sell, transfer, publicly display, publicly perform, transmit, stream, broadcast, access, view, and otherwise exploit such contributions on, through, by means of or to promote or market the Charity Games website. Charity Games does not claim any ownership rights in any such contributions and nothing in these Terms of Use will be deemed to restrict any rights that you may have to use and exploit any of these contributions. If you choose to make any of these contributions available through or in connection with the Charity Games website, you do so at your own risk. 

## Acceptable use policy
You hereby represent and warrant that your contributions do not violate the Acceptable Use Policy (defined below). You may not state or imply that your contributions are in any way provided, sponsored or endorsed by Charity Games. You may expose yourself to liability if, for example, your contributions violate the Acceptable Use Policy. Charity Games is not obligated to backup any contributions and contributions may be deleted at anytime. You are solely responsible for creating backup copies of your contributions if you desire. 
<br/>
<br/>
You agree that you are solely responsible for all your contributions to the Charity Games website and you expressly agree not to post, upload to, transmit, distribute, store, create or otherwise publish through the Charity Games website any of the following: 

- Content that would constitute, encourage or provide instructions for a criminal offense, violate the rights of any party, or that would otherwise create liability or violate any local, state, national or international law.
- Content that may infringe any patent, trademark, trade secret, copyright or privacy
- Content that impersonates any person or entity or otherwise misrepresents your affiliation with a person or entity.
- Unsolicited promotions, political campaigning, advertising or solicitations.
- Private information of any third party, including, without limitation, addresses, phone numbers, email addresses, Social Security numbers and credit card numbers.
- Viruses, corrupted data or other harmful, disruptive or destructive files.
- Content that is unrelated to the topic of the Interactive Area(s) in which such Content is posted.
- Content that is objectionable or which restricts or inhibits any other person from using or enjoying the Interactive Areas or the Charity Games website, or which may expose Charity Games or its affiliates or its users to any harm or liability of any type.
- Content that is an invasion of privacy or which may constitute defamation, harassment or abuse.
- Content that is commercial in nature, including, without limitation, advertising, promotional materials, or solicitation of any kind.
- Content that is false, deceptive, or misleading.
- Content that, in the sole judgment of Charity Games, is objectionable or which restricts or inhibits any other person from using or enjoying the Interactive Areas or the Charity Games website, or which may expose Charity Games or its affiliates or its users to any harm or liability of any type.
- Content that violates any applicable local, state, national or international law, or that violates any right of any other person, including, without limitation, intellectual property rights (including without limitation copyrights).
- Any material, non-public information about a company without the proper authorization to do so.
- Content that utilizes Charity Games to develop competitive information about Charity Games or its affiliates or users.
- Sexual content or links to sexual content.
- Content that is, in the sole discretion of Charity Games, otherwise objectionable.

## Disclaimer of warranties
To the fullest extent permitted under applicable law: (A) the site and any products and third party materials are made available to you on an "AS IS", "WHERE IS" and "WHERE AVAILABLE" basis, without any warranties of any kind, whether express, implied or statutory; and (B) Charity Games disclaims all warranties with respect to the site and any products and third party materials to the fullest extent permissible under applicable law, including the warranties of merchantability, fitness for a particular purpose, non-infringement and title. All disclaimers of any kind (including in this section and elsewhere in these terms of use) are made for the benefit of both Charity Games and its affiliates and their respective shareholders, directors, officers, employees, affiliates, agents, representatives, licensors, suppliers and service providers (collectively, the "affiliated entities"), and their respective successors and assigns.
<br/>
<br/>
While we try to maintain the timeliness, integrity and security of the site, we do not guarantee that the site is or will remain updated, complete, correct or secure, or that access to the site will be uninterrupted. The site may include inaccuracies, errors and materials that violate or conflict with these terms of use. Additionally, third parties may make unauthorized alterations to the site. If you become aware of any unauthorized third party alteration to the site, contact us at [${emailRoutes.support}](mailto:${emailRoutes.support}).

## Limitation of liability
To the fullest extent permitted under applicable law: (A) Charity Games will not be liable for any indirect, incidental, consequential, special, exemplary or punitive damages of any kind, under any contract, tort, negligence, strict liability or other theory, including damages for loss of profits, use or data, loss of other intangibles, loss of security of submissions (including unauthorized interception by third parties of any submissions or any associated information), even if advised in advance of the possibility of such damages or losses; (B) without limiting the foregoing, Charity Games will not be liable for damages of any kind resulting from your use of or inability to use the site or from any products or third party materials; (C) your sole and exclusive remedy for dissatisfaction with the site or any products or third party materials is to stop using the site; and (D) the maximum aggregate liability of Charity Games for all damages, losses and causes of action, whether in contract, tort (including negligence) or otherwise, shall be the greater of the total amount, if any, paid by you to Charity Games to use the site or $1.00. All limitations of liability of any kind (including in this section and elsewhere in these terms of use) are made for the benefit of both Charity Games and the affiliated entities, and their respective successors and assigns.

## Indemnity
To the fullest extent permitted under applicable law, you agree to defend, indemnify and hold harmless Charity Games and the affiliated entities, and their respective successors and assigns, from and against all claims, liabilities, damages, judgments, awards, losses, costs, expenses and fees (including attorneys' fees) arising out of or relating to (A) your use of, or activities in connection with, the site (including all submissions); and (B) any violation or alleged violation of these terms of use by you.

## Termination
Notwithstanding anything contained in these terms of use, we reserve the right, without notice and in our sole discretion, to terminate your right to access or use the site at any time and for any or no reason, and you acknowledge and agree that we shall have no liability or obligation to you in such event and that you will not be entitled to a refund of any amounts that you have already paid to us, to the fullest extent permitted by applicable law.

## Governing law
These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.

All disputes arising out of or relating to these Terms of Use (including formation, performance or alleged breach) or your use of the site will be exclusively resolved under confidential binding arbitration held in the United States before and in accordance with the Rules of the American Arbitration Association. The arbitrator's award will be binding and may be entered as a judgment in any court of competent jurisdiction. You agree that you and Charity Games are each waiving the right to trial by a jury. Any claim you have arising out of or relating to these terms of use (including formation, performance or alleged breach) or your use of the site must be filed within one year after such claim arose or it is forever barred. You agree that any arbitration under this agreement will take place on an individual basis; class arbitrations and class actions are not permitted and you are agreeing to give up the ability to participate in a class action. The parties agree to waive their right to trial by jury. The Federal Arbitration Act governs the interpretation and enforcement of this provision. This arbitration provision shall survive termination of these terms of use and the termination of your Charity Games account. The award of the arbitrator shall be final and binding upon you and us.

## Filtering
We hereby notify you that parental control protections (such as computer hardware, software or filtering services) are commercially available that may assist you in limiting access to material that is harmful to minors. Information identifying current providers of such protections is available at the Electronic Frontier Foundation website, http://www.eff.org. Please note that Charity Games does not endorse any of the products or services listed at such site.

## Copyright infringement
If you believe that any material on the site infringes upon any copyright, you or your agent may send us a written notice by email requesting that we remove such material or block access to it. If you believe that someone has wrongly filed a notice of infringement against you, you may send us a counter-notice. Notices and counter-notices must meet the then-current statutory requirements imposed by the DMCA. See http://www.copyright.gov. 

We suggest that you consult your legal advisor before filing a notice or counter-notice. Also, be aware that there can be penalties for false claims under the DMCA.

You may send us your notice or counter-notice by email to [${emailRoutes.support}](mailto:${emailRoutes.support}).

## Notice for California users
California users are also entitled to the following specific consumer rights notice: The Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs may be contacted in writing at 1625 North Market Blvd., Suite N 112, Sacramento, CA 95834, or by telephone at (916) 445-1254 or (800) 952-5210. You may contact us at [${emailRoutes.support}](mailto:${emailRoutes.support}).

## Miscellaneous
This agreement does not, and shall not be construed to, create any partnership, joint venture, employer-employee, agency or franchisor-franchisee relationship between you and Charity Games. If any of this agreement is found to be unlawful, void or for any reason unenforceable, that provision will be deemed severable from this agreement and will not affect the validity and enforceability of any remaining provision. You may not assign, transfer or sublicense any or all of your rights or obligations under this agreement without our express prior written consent. We may assign, transfer or sublicense any or all of our rights or obligations under this agreement without restriction. No waiver by either party of any breach or default hereunder will be deemed to be a waiver of any preceding or subsequent breach or default. Any heading, caption or section title contained herein is for convenience only, and in no way defines or explains any section or provision. All terms defined in the singular shall have the same meanings when used in the plural, where appropriate and unless otherwise specified. Any use of the term "including" or variations thereof in this agreement shall be construed as if followed by the phrase "without limitation." This agreement, including any terms and conditions incorporated herein, is the entire agreement between you and Charity Games relating to the subject matter hereof, and supersedes any and all prior or contemporaneous written or oral agreements or understandings between you and Charity Games relating to such subject matter. Notices to you (including notices of changes to this agreement) may be made via posting to the site or by e-mail (including in each case via links), or by regular mail. Without limitation, a printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. Charity Games will not be responsible for any failure to fulfill any obligation due to any cause beyond its control. Charity Games's licensors are intended third party beneficiaries of these terms of use, including without limitation the disclaimers of warranties and limitations of liability set forth herein, and such licensors will have the right to enforce these terms of use against you as third party beneficiaries hereof. Charity Games will not be responsible for any failure to fulfill any obligation due to any cause beyond its control.
`;
