const path = require('path');

module.exports = ({ config }) => {
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve('./'),
  ];

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [/stories/, /src/, /demo/],
    exclude: /node_modules/,
    loaders: [
      'babel-loader',
      require.resolve('@storybook/addon-storysource/loader'),
      require.resolve('awesome-typescript-loader'),
    ],
    enforce: 'pre',
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
