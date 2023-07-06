// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Worksheets.dev',
  tagline:
    'Automate your workflows in minutes with our Low-Code Application Integration Platform.',
  url: 'https://worksheets.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          showReadingTime: true,
          editUrl: 'https://worksheets.dev/contact-us',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Worksheets.dev',
        logo: {
          alt: 'Worksheets Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Getting Started',
          },
          {
            href: '/support',
            label: 'Support',
            position: 'left',
          },
          {
            href: '/blog',
            label: 'Blog',
            position: 'left',
          },
          {
            href: 'https://worksheets.dev/templates',
            label: 'Templates',
            position: 'left',
          },
          {
            href: 'https://worksheets.dev/applications',
            label: 'Applications',
            position: 'left',
          },
          {
            to: 'https://worksheets.dev/login',
            label: 'Login',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/ujEmEdjCaY',
              },
              {
                label: 'Contact Us',
                href: 'https://worksheets.dev/contact-us',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Login',
                href: 'https://worksheets.dev',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Gwenyth, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
