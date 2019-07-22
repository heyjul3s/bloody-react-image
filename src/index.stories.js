import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withTests } from '@storybook/addon-jest';
import { withReadme } from 'storybook-readme';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withA11y } from '@storybook/addon-a11y';
import { Img } from '.';
import results from '../.jest-test-results.json';
import ImageReadme from '../README.md';

storiesOf('Img', module)
  .addDecorator(withA11y)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(ImageReadme))
  .addDecorator(withTests({ results }))
  .addDecorator(jsxDecorator)
  .add(
    'Image Render',
    () => {
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
    },
    {
      jest: ['index.test.js'],
    }
  )
  .add(
    'with FallbackImage',
    () => {
      const imgUrl = 'https://source.unsplash.com/random/200x200';
      const altText = text('Alt Text', 'Lorem Ipsum Dolor Sit Amet');
      const srcSet = [];
      const sizes = [];

      return (
        <Img
          src="funnyImage"
          alt={altText}
          srcSet={srcSet}
          sizes={sizes}
          fallbackImageUrl={imgUrl}
        />
      );
    },
    {
      jest: ['index.test.js'],
    }
  )
  .add(
    'with Srcset And Sizes',
    () => {
      const imgUrl = 'https://source.unsplash.com/random/800x600';
      const altText = text('Alt Text', 'Lorem Ipsum Dolor Sit Amet');
      const srcSet = [
        'https://source.unsplash.com/random/480x480 480w',
        'https://source.unsplash.com/random/800x600 800w',
      ];
      const sizes = ['(max-width: 320px) 280px', '(max-width: 480px) 440px'];

      return <Img src={imgUrl} alt={altText} srcset={srcSet} sizes={sizes} />;
    },
    {
      jest: ['index.test.js'],
    }
  )
  .add(
    'with Placeholder component',
    () => {
      const imgUrl = 'https://source.unsplash.com/random/800x600';
      const altText = text('Alt Text', 'Lorem Ipsum Dolor Sit Amet');
      const placeholder = () => {
        return <h1 className="image-placeholder">... Loading </h1>;
      };

      return <Img src={imgUrl} alt={altText} ImagePlaceholder={placeholder} />;
    },
    {
      jest: ['index.test.js'],
    }
  )
  .add(
    'with Div Background Image',
    () => {
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
    },
    {
      jest: ['index.test.js'],
    }
  )
  .add(
    'with onload as props',
    () => {
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
    },
    {
      jest: ['index.test.js'],
    }
  )
  .add(
    'with VisibilitySensor',
    () => {
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
    },
    {
      jest: ['index.test.js'],
    }
  );
