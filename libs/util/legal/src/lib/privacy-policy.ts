import { routes } from '@worksheets/routes';
import { printDate } from '@worksheets/util/time';

const createdAtDate = printDate('06-18-2024');
const updatedAtDate = printDate('06-18-2024');
const contactUs = `<a href="${routes.contact.path()}">contact us</a>`;

export const privacyStatement = `
<p><strong>Released:</strong> ${createdAtDate}</p>
<p><strong>Last Updated:</strong> ${updatedAtDate}</p>

<h2>General Information</h2>
<p>Welcome to CharityGames, where we are committed to protecting your privacy. This Privacy Statement explains how we collect, use, and safeguard your personal information when you visit our website and use our gaming services.</p>

<p>This privacy notice applies to all information collected through our website (such as charity.games), and/or any related services, sales, marketing, or events (we refer to them collectively in this privacy notice as the "Services"). We refer to CharityGames as "we", "us", or "our" in this privacy notice. By using our Services, you agree to the terms of this Privacy Statement.</p>

<h2>What Data Do We Collect?</h2>
<p>We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device (“personal information”). In particular, we have collected the following categories of personal information from consumers within the last twelve (12) months:</p>
<ul>
  <li>Personal identification information (e.g., real name, email address).</li>
  <li>Device and browser information (e.g., IP address, browser type, operating system).</li>
  <li>Game play data and user preferences.</li>
  <li>Cookies and similar technologies.</li>
  <li>Payment information (e.g., credit card number, billing address).</li>
  <li>Information provided by third parties (e.g., social media platforms).</li>
  <li>Other information that you voluntarily provide to us.</li>
</ul>

<h2>How Do We Obtain Your Data?</h2>
<p>We collect data directly from you when you register, use our services, or interact with our website. Additionally, we may gather information through cookies and similar technologies. We may also receive information from third parties, such as social media platforms.</p>

<p>This information is collected when you:</p>
<ul>
  <li>Register for an account.</li>
  <li>Use our gaming services.</li>
  <li>Interact with our website.</li>
  <li>Contact us for support.</li>
  <li>Subscribe to our newsletter.</li>
  <li>Participate in a survey, contest, or promotion.</li>
  <li>Provide us with feedback.</li>
</ul>
<p>All features on our website are available without registration. However, you may be required to register for an account to use our campaign management services. No contact information is required to register for an account.</p>

<h2>How Do We Use Your Data?</h2>
<p>We may use or disclose the personal information we collect for one or more of the following business purposes:</p>
<ul>
  <li>Providing you with our gaming services.</li>
  <li>Improving our website and services.</li>
  <li>Personalizing your experience.</li>
  <li>Processing payments.</li>
  <li>Communicating with you about updates, promotions, and support.</li>
  <li>Ensuring the security and integrity of our gaming platform.</li>
  <li>Complying with legal obligations.</li>
  <li>Enforcing our Terms of Service.</li>
</ul>

<h2>General Processing Purposes</h2>
<p>In general, we process your data based on legal obligation. This means that we process your data to comply with applicable laws and regulations.</p>

<h2>Legitimate Interests</h2>
<p>We also process your data based on our legitimate interests. This means that we process your data to provide you with a seamless gaming experience and to improve our services.</p>

<h2>Minors and children:</h2>
<p>We do not knowingly collect personal information directly from children under the age of 13 (16 in the United Kingdom/European Union) without parental consent. Our websites are general audience sites and are not specifically targeted to or intended for use by individuals under the age of 16.</p>

<p>If you are a parent or guardian and believe that your child has provided us with personal information, please ${contactUs}. We will remove such data to the extent required by applicable laws.</p>

<h2>Who Do We Share Your Data With?</h2>
<p>We do not sell or rent your personal information to third parties. We may share your data with trusted third-party service providers to support our operations and provide you with a seamless gaming experience.</p>

<p>We rely on third parties to provide many features of our Services using data about your use of our Services and of other websites. These third parties may use cookies, web beacons, or other technologies to collect and process your personal data for the purposes of information storage and access. We may disclose your personal information to a third party for a business purpose. When we disclose personal information for a business purpose, we enter a contract that describes the purpose and requires the recipient to both keep that personal information confidential and not use it for any purpose except performing the contract.</p>

<p>In the preceding twelve (12) months, we have not sold any personal information.</p>

<h2>Which Countries Do We Transfer Your Data To?</h2>
<p>Your data is not transferred to any country outside of the United States. If we transfer your data to a third party, we will ensure that the recipient provides an adequate level of data protection. We will also enter into data processing agreements with all recipients outside of our organization.</p>

<h2>How Do We Secure Your Data?</h2>
<p>We employ industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction. This includes encryption, secure socket layer (SSL) technology, and regular security audits. Your data is stored on secure servers and is only accessible to authorized personnel. Data is encrypted when it is transmitted over the internet and when it is stored on our servers.</p>

<h2>How Long Do We Retain Your Data?</h2>
<p>We retain your data for as long as necessary to fulfill the purposes outlined in this Privacy Statement or as required by law. You may contact us to request the deletion of your data.</p>

<h2>What Are Your Privacy Rights?</h2>
<p>You have the right to:</p>
<ul>
  <li>Access, correct, or delete your personal information.</li>
  <li>Object to the processing of your data.</li>
  <li>Withdraw consent for data processing.</li>
  <li>Lodge a complaint with a supervisory authority.</li>
  <li>Receive a copy of your data in a structured, machine-readable format.</li>
</ul>

<h3>Access Request Rights</h3>

<p>You have the right to request that we disclose certain information to you about our collection and use of your personal information over the past 12 months. Once we receive and confirm your verifiable consumer request, we will disclose to you:</p>

<ul>
  <li>The categories of personal information we collected about you.</li>
  <li>The categories of sources for the personal information we collected about you.</li>
  <li>Our business or commercial purpose for collecting personal information.</li>
  <li>The categories of third parties with whom we share that personal information.</li>
  <li>The specific pieces of personal information we collected about you (also called a data portability request).</li>
</ul>

<h3>Deletion Request Rights</h3>

<p>You have the right to request that we delete any of your personal information we collected from you and retained, subject to certain exceptions. Once we receive and confirm your verifiable consumer request, we will delete (and direct our service providers to delete) your personal information from our records, unless an exception applies.</p>

<p>We may deny your deletion request if retaining the information is necessary for us or our service providers to:</p>

<ul>
  <li>Complete the transaction for which we collected the personal information, provide a good or service that you requested, take actions reasonably anticipated within the context of our ongoing business relationship with you, or otherwise perform our contract with you.</li>
  <li>Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or prosecute those responsible for such activities.</li>
  <li>Debug products to identify and repair errors that impair existing intended functionality.</li>
  <li>Exercise free speech, ensure the right of another consumer to exercise their free speech rights, or exercise another right provided for by law.</li>
  <li>Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when the information's deletion may likely render impossible or seriously impair the research's achievement, if you previously provided informed consent.</li>
  <li>Enable solely internal uses that are reasonably aligned with consumer expectations based on your relationship with us.</li>
  <li>Comply with a legal obligation.</li>
  <li>Make other internal and lawful uses of that information that are compatible with the context in which you provided it.</li>
</ul>

<h3>Response timing and format</h3>

<p>We endeavor to respond to a verifiable consumer request within 45 days of its receipt. If we require more time (up to 90 days), we will inform you of the reason and extension period in writing. If you have an account with us, we will deliver our written response to that account. If you do not have an account with us, we will deliver our written response by mail or electronically, at your option. Any disclosures we provide will only cover the 12-month period preceding the verifiable consumer request's receipt. The response we provide will also explain the reasons we cannot comply with a request, if applicable. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit the information from one entity to another entity without hindrance.</p>

<p>We do not charge a fee to process or respond to your verifiable consumer request unless it is excessive, repetitive, or manifestly unfounded. If we determine that the request warrants a fee, we will tell you why we made that decision and provide you with a cost estimate before completing your request.</p>

<h2>Google Limited Use Requirements</h2>
<p>Charity Games' use and transfer to any other app of information received from Google APIs will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">
Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
<p>Read more about Google's Limited Use Requirements <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">here</a>.</p>

<h2>Changes to Our Privacy Statement</h2>
<p>We reserve the right to amend this privacy notice at our discretion and at any time. When we make changes to this privacy notice, we will notify you by email or through a notice on our website homepage (<a href="https://charity.games">https://charity.games</a>). You are responsible for periodically visiting our website and this Privacy Notice to check for any changes.</p>

<h2>Contact Information</h2>
<p>If you have any questions or comments about this Privacy Notice, our Privacy Policy, the ways in which we collect and use your personal information, 
your choices and rights regarding such use, or wish to exercise your rights, please ${contactUs} for more information.</p>

<p>This Privacy Statement is effective as of ${createdAtDate} and may be updated periodically. Please check this page for the latest information.</p>
`;
