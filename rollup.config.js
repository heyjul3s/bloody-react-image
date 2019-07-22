import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const config = {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'esm',
  },
  external: ['prop-types', 'react'],
  plugins: [
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/proposal-class-properties', '@babel/transform-runtime'],
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify({}, minify));
}

export default config;
