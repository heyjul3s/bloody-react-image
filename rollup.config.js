import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

const config = {
  input: 'src/index.tsx',
  output: {
    file: 'lib/index.js',
    format: 'esm',
  },
  external: ['react'],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify({}, minify));
}

export default config;
