const path = require('path');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = ({ config }) => {
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve('./'),
  ];

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [/stories/, /src/],
    exclude: /node_modules/,
    loaders: [
      'babel-loader',
      require.resolve('@storybook/addon-storysource/loader'),
      require.resolve('awesome-typescript-loader'),
      require.resolve('react-docgen-typescript-loader'),
    ],
    enforce: 'pre',
  });

  config.plugins.push(new TSDocgenPlugin());
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
