const config = {
  stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
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
      from: '../../../assets/blog/src/lib',
      to: '/blog',
    },
    {
      from: '../../../assets/games/src/lib',
      to: '/games',
    },
  ],
};

export default config;
