import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';
import { Img } from './index';
import { Loading } from '../demo/demo.loader';

storiesOf('Img', module)
  .addDecorator(withA11y)
  .addDecorator(withKnobs)
  .addDecorator(withInfo)
  .addParameters({ jest: ['Img'] })
  .add('Image Render', () => {
    const imgUrl = 'https://source.unsplash.com/random/200x200';
    const altText = text('Alt Text', 'Lorem Ipsum Dolor Sit Amet');

    return (
      <Img
        src={imgUrl}
        alt={altText}
        style={{
          display: 'block',
        }}
      />
    );
  })
  .add('with FallbackImage', () => {
    const imgUrl = 'https://source.unsplash.com/random/200x200';
    const altText = text('Alt Text', 'Lorem Ipsum Dolor Sit Amet');

    return <Img src="funnyImage" alt={altText} fallbackImageUrl={imgUrl} />;
  })
  .add('with Srcset And Sizes', () => {
    const imgUrl = 'https://source.unsplash.com/random/800x600';
    const altText = text('Alt Text', 'Lorem Ipsum Dolor Sit Amet');
    const srcSet =
      'https://source.unsplash.com/random/480x480 480w, https://source.unsplash.com/random/800x600 800w';
    const sizes = '(max-width: 320px) 280px, (max-width: 480px) 440px';

    return <Img src={imgUrl} alt={altText} srcset={srcSet} sizes={sizes} />;
  })
  .add('with image as Placeholder component', () => {
    const imgUrl = 'https://source.unsplash.com/random/400x400';
    const altText = text('Alt Text', 'Lorem Ipsum Dolor Sit Amet');

    return (
      <div className="figure" style={{ position: 'relative' }}>
        <Img src={imgUrl} alt={altText} ImagePlaceholder={Loading} />
      </div>
    );
  })
  .add('with Div Background Image', () => {
    const imgUrl = 'https://source.unsplash.com/random';
    const altText = text('Alt Text', 'Lorem Ipsum Dolor Sit Amet');
    const customStyles = {
      backgroundSize: 'cover',
      height: '400px',
    };

    return (
      <Img
        src={imgUrl}
        alt={altText}
        fit="cover"
        position="50% 50%"
        style={customStyles}
      >
        <div className="content">
          <h1>Funny Hahah</h1>
          <p>a simple sentence</p>
        </div>
      </Img>
    );
  })
  .add('with onload as props', () => {
    const imgUrl = 'https://source.unsplash.com/random/100x100';
    const altText = text('Alt Text', 'Lorem Ipsum Dolor Sit Amet');

    return (
      <Img
        src={imgUrl}
        alt={altText}
        fit="cover"
        position="50% 50%"
        onload={args => {
          console.log(args);
        }}
      />
    );
  })
  .add('with onerror as props', () => {
    const altText = text('Alt Text', 'Lorem Ipsum Dolor Sit Amet');

    return (
      <Img
        src="hello"
        alt={altText}
        fit="cover"
        position="50% 50%"
        onerror={args => {
          console.log(args);
        }}
      />
    );
  });
