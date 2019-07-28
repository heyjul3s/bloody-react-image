# Bloody React Image

A React component for your image rendering/handling needs.

- ready to go image component
- can be utilised to render a div background imagery (if you want to)
- custom placeholders for when image is loading
- img srcset and sizes support and handling
- WAI-ARIA support
- CSS object-fit, object-position support and handling for IE 11 (It is 2019, and next year we'll be in the roaring 20s... why do we hurt ourselves like this?)
- supports React 16.3 and above

This component first attempts to load your intended image. If this fails, it will attempt to render a fallback image if provided. Should the fallback image fail (or is not defined) as well, the component will simply render nothing at all and saves you from a broken image icon floating around on your view. That's the gist of it. Also note that, the image will only appear once it is fully loaded so you may want to add a placeholder (which you can pass in as props, see below for info).

## Support

### Browser Support

This component opts-in to use object-fit and object-position by default and these rules are supported by most modern browsers(Chrome, Safari, Opera, Firefox, Edge, etc.). For IE 11 (and potentially other obscure, hipster browsers) where object-fit and object-position is not supported, it will not include these properties as they are filtered should browsers not support it.

### Accessibility Support

The Bloody React Image component allows for setting aria-label, aria-labelledby, aria-described-by and longdesc. Simply define these as props if you wish to use them. For further information on implementing accessible imagery please refer to
[W3C Web Accessibility Initiative - Images Concepts](https://www.w3.org/WAI/tutorials/images/).

## Installation

You may install it via `yarn add bloody-react-image` or `npm install bloody-react-image`

## Props

Below are a list of available props you can pass to the component while image attributes you can pass to an img tag, you can do so for the component.

| Prop               | Type            | Default Value | Return Values                                                           | Description                                                                         |
| ------------------ | --------------- | ------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| fit                | string          | contain       | None                                                                    | Defines the fit or background size of the image                                     |
| position           | string          | 50% 50%       | None                                                                    | Defines the position of the image                                                   |
| fallbackImageUrl   | string          | undefined     | None                                                                    | Defines a fallback image to be used                                                 |
| ImagePlaceholder   | React Component | undefined     | None                                                                    | Defines a component that will be shown when the image is loading                    |
| decode             | boolean         | undefined     | None                                                                    | Specify whether to use image.decode for the image                                   |
| progressiveLoading | boolean         | false         | None                                                                    | Specify whether to load the image progressively                                     |
| onErrorImage       | function        | undefined     | { imgSrc: string, isLoaded: boolean, isLoading: boolean, error: Error } | Defines an error handler for if it occurs during image load. Returns a state object |
| onLoadImage        | function        | undefined     | { imgSrc: string, isLoaded: boolean, isLoading: boolean, error: Error } | Defines an onload handler when image loads. Returns a state object                  |

## Style Defaults

There are minor default styles that come with it.

| Style Defaults       | Default Value                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| img                  | **{ objectFit: 'contain', objectPosition: '50% 50%'}**                                                           |
| div background image | **{display: 'block', backgroundPosition: '50% 50%', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }** |

## Usage

### Basic Usage

At its most basic usage, you can use it like a regular `img` tag

```
import Img from 'bloody-react-image'

<Img src="someurl" alt="some text" />
```

### Defining object-fit and object-position

Simply add the `fit` prop and or `position` prop

```
import Img from 'bloody-react-image'

<Img src="someurl" alt="some text" fit="cover" position="50% 50%" />
```

### Background Image (in a div element)

If you wish to use it as a background image, simply add child elements:

```
import { Img } from 'bloody-react-image';

<Img src="someurl" alt="some text">
  <h1>This is an H1 title</h1>
  <p>This is a sentence</p>
<Img/>
```

\*\*Disclaimer: This has some basic default styles however, fancy custom styles and images are not included. BYO styles is necessary for better results.\*\*

### Placeholders

You can stick another component as a placeholder while the image is loading. Note that there are 3 props that will be available to you:

- **isImgLoading: boolean**
- **isImgLoaded: boolean**
- **isImgError: string | Error**.

Simply create one:

```
export const FunnyImagePlaceholder = ({ isImgLoading, isImgLoaded, isImgError }) => <div>This Funny Image Placeholder Is Not Funny...</div>;
```

```
import { Img } from 'bloody-react-image';
import { FunnyImagePlaceholder } from './FunnyImagePlaceholer';

<Img src="someurl" alt="some text" ImagePlaceholder={FunnyImagePlaceholder} />
```

## Other Usage

There are times when you will require a more elaborate setup for your imagery. Below are suggestions on what you can do for each situation:

### Styling

The component was designed to try to accommodate common use cases for convenience. You can wrap it with whatever element it is that you need and you can use it with SASS, raw CSS, pass in custom styles via the `style` prop and Styled Components. The first 3 use cases is a no-brainer however if you're using Styled Components and would like to use this component in your app, you can try to wrap it around a styled component, something like so:

```
import { Img } from 'bloody-react-image';
import { styled } from 'styled-components';

const StyledImage = styled.figure`
  > img
    display: block;
    width: 100%;
    height: auto;
`;

export const Image = ({ src, alt }) => {
  return (
    <StyledImage>
      <Img src={src} alt={alt} />
    </StyledImage>
  );
};
```

From here, you know what to do. Pass in your props if you need to, take over the world, etc. Styles can be overridden via the `style` prop. Simply define as props however, `object-fit` and `object-position` are filtered should the browser not support it. This is to prevent undesired rendering results.

### Rendering only if the image is in view

You can try to use Bloody React Image together with another package called [React Visibility Sensor](https://www.npmjs.com/package/react-visibility-sensor) and see if that floats your boat.
