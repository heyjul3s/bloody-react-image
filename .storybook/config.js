import { addParameters, configure } from '@storybook/react';

function loadStories() {
  const req = require.context('../src', true, /\.stories\.tsx$/);
  req.keys().forEach(filename => {
    if (filename.includes('node_modules')) {
      return;
    }
    return req(filename);
  });
}

addParameters({
  options: {
    className: void 0,
    src: '',
    alt: '',
    type: '',
    fit: '',
    crossOrigin: '',
    decoding: 'async',
    srcset: '',
    sizes: '',
    role: null,
    ariaLabel: null,
    onError: null,
    onLoad: null,
    placeholder: null,
  },
});

configure(loadStories, module);
