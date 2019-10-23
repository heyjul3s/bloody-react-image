import typescript from 'rollup-plugin-typescript2';

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

export default config;
