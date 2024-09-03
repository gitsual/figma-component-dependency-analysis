// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Figma Component Dependency Analysis',
  tagline: 'Deep insights into your Figma designs',
  favicon: 'img/favicon.ico',

  // Set the production URL of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gitsual', // Replace with your GitHub org/user name.
  projectName: 'figma-component-dependency-analysis', // Replace with your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Useful metadata like html lang.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/gitsual/figma-component-dependency-analysis/edit/main/docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/gitsual/figma-component-dependency-analysis/edit/main/blog/',
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
      image: 'img/docusaurus-social-card.png',
      navbar: {
        title: 'Figma Component Dependency Analysis',
        logo: {
          alt: 'Figma Component Dependency Analysis Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mySidebar',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/gitsual/figma-component-dependency-analysis',
            label: 'GitHub',
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
                label: 'Introduction',
                to: '/docs/introduction',
              },
              {
                label: 'API',
                to: '/docs/api/figma-service',
              },
              {
                label: 'Components',
                to: '/docs/components/analyze-components',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/gitsual/figma-component-dependency-analysis/discussions',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/sanz_sual',
              }
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
                label: 'GitHub',
                href: 'https://github.com/gitsual/figma-component-dependency-analysis',
              },
            ],
          },
        ],
        copyright: `Copyleft © ${new Date().getFullYear()} Figma Component Dependency Analysis`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
