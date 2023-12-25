const config = {
  stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-actions'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: [
    {
      from: '../../../assets/common/src/lib',
      to: '/common',
    },
    {
      from: '../../../assets/games/src/lib',
      to: '/games',
    },
    {
      from: '../../../assets/blog/src/lib',
      to: '/blog',
    },
    {
      from: '../../../assets/partners/src/lib',
      to: '/partners',
    },
  ],
};

export default config;
