import { printDate } from '@worksheets/util/time';

const createdAtDate = printDate('04-10-2025');
const updatedAtDate = printDate('04-10-2025');

export const submissionGuidelines = `
<p><b>Released: ${createdAtDate}</b></p>
<p><b>Last Updated: ${updatedAtDate}</b></p>
<h2>1. Eligibility</h2>
<p>All submitted games must be original works created by you or your team. You must have the legal right to submit the game and all its components (including artwork, music, and code).</p>

<h2>2. Content Guidelines</h2>
<p>Games must not contain offensive, discriminatory, or inappropriate content. We reserve the right to reject any submission that we deem to violate our community standards.</p>

<h2>3. Technical Requirements</h2>
<p>All games must be thoroughly tested and free of major bugs or technical issues. Games should include clear instructions for gameplay.</p>

<h2>4. Intellectual Property</h2>
<p>You retain ownership of your game and all associated intellectual property. By submitting your game, you grant us a non-exclusive license to distribute, promote, and display your game on our platform.</p>

<h2>5. Updates and Maintenance</h2>
<p>You are responsible for maintaining your game and providing updates as necessary. We encourage regular updates to fix bugs and improve gameplay.</p>
`;
