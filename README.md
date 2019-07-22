# Bloody React Image

A slightly more robust React component for your image rendering/handling needs.

Featuring:

- ready to go image component
- can be utilised to render a div background imagery (if you want to)
- img srcset and sizes support and handling
- CSS object-fit, object-position support and handling
- WAI-ARIA support
- IE 11 fallback (It is 2019, and next year we'll be in the roaring 20s... why do we hurt ourselves like this?)
- supports React 16.3 and above

## What does this component do?

This component first attempts to load your intended image. If this fails, it will attempt to render a fallback image if provided. Should the fallback image fail (or is not defined) as well, the component will simply render nothing at all and saves you from a broken image icon floating around on your view. That's the gist of it. Also note that, the image will only appear once it is fully loaded.
## What About Support?

### Browser Support

This component opts-in to use object-fit and object-position by default and these rules are supported by most modern browsers(Chrome, Safari, Opera, Firefox, Edge, etc.). For IE 11 (and potentially other obscure, hipster browsers) where object-fit and object-position is not supported, it will not include these properties as they are filtered should browsers not support it.

### Accessibility Support

The Bloody React Image component allows for setting aria-label, aria-labelledby, aria-described-by and longdesc. Simply define these as props if you wish to use them. For further information on implementing accessible imagery please refer to
[W3C Web Accessibility Initiative - Images Concepts](https://www.w3.org/WAI/tutorials/images/).

### Fancy Image Rendering CSS style rule

You may include this via the style property on your component or via SASS or whatever it is the cool kids are using nowadays. What am I talking about? The [image-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering) CSS rule, son. The Bloody React Image component does not handle this for you as it is deemed out of scope due to it being more of a style issue. Just remember to vendor prefix it as you know, as usual, all sorts of funny Mickey Mouse shit with the browsers (As of writing, Chrome does not support `crisp-edges`, Firefox does not support 'pixelated', IE goes full ape shit with `-ms-interpolation-mode`, etc.). I don't know. You're a big boy/girl now and daddy is tired. You can handle it. I believe in you.

## How Do I Install This?

You may install it via `yarn add bloody-react-image` or `npm install bloody-react-image`

## What Props Are Available?

Below are a list of available props you can pass to the component. Basically, most image attributes you can pass to an img tag, you can do so for the component.

| Prop             | Type            | Default Value                                                                                                                                                          | Description                                                                             |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| alt              | string          | undefined                                                                                                                                                              | The alt text for the image                                                                            |
| ariaLabel        | string          | undefined                                                                                                                                                              | Used for accessibility                                                                  |
| ariaLabelledBy   | string          | undefined                                                                                                                                                              | Used for accessibility                                                                  |
| ariaDescribedBy  | string          | undefined                                                                                                                                                              | Used for accessibility                                                                  |
| className        | string          | undefined                                                                                                                                                              | It's... a className                                                                     |
| crossOrigin      | string          | undefined                                                                                                                                                              | Defines cross-origin handling. Can be of value **'anonymous'** or **'use-credentials'** |
| decoding         | string          | undefined                                                                                                                                                              | Defines image decoding. Can be value of **'sync'**, **'async'** or **'auto'**           |
| fallbackImageUrl | string          | undefined                                                                                                                                                              | Defines a fallback image to be used                                                     |
| ImagePlaceholder | React Component | undefined                                                                                                                                                              | Defines a component that will be shown when the image is loading                        |
| longdesc         | string          | undefined                                                                                                                                                              | Used for accessibility                                                                  |
| sizes            | string or array | undefined                                                                                                                                                              | Defines image sizes                                                                     |
| src              | string          | undefined                                                                                                                                                              | The image source URL                                                                    |
| srcSet           | string or array | undefined                                                                                                                                                              | Defines image sizes                                                                     |

| Prop             | Type            | Default Value | Return Values | Description |
| ---------------- | --------------- | --------------- | --------------- | --------------- |
| onErrorImage | function | undefined | { imgSrc: string, isLoaded: boolean, isLoading: boolean, error: Error  } | Defines an error handler for if it occurs during image load. Returns a state object
| onLoadImage | function | undefined | { imgSrc: string, isLoaded: boolean, isLoading: boolean, error: Error  } | Defines an onload handler when image loads. Returns a state object

| Prop             | Type            | Default Value |
| ---------------- | --------------- | --------------- |
| style            | object          | **{ objectFit: 'contain', objectPosition: '50% 50%'}**  or for background imagery, **{display: 'block', backgroundPosition: 'contain', backgroundRepeat: 'no-repeat', backgroundSize: 'fit' }** | Base styles are included by default

## How Do I Use This?

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

### Srcset and Sizes

```
import { Img } from 'bloody-react-image';

<Img src="someurl" alt="some text" srcset="elva-fairy-320w.jpg 320w, elva-fairy-480w.jpg 480w" sizes="(max-width: 600px) 200px, 50vw" />
```

### Placeholders

You can stick another component as a placeholder while the image is loading.

Simply create one:

```
export const FunnyImagePlaceholder = () => <div>This Funny Image Placeholder Is Not Funny...</div>;
```

```
import { Img } from 'bloody-react-image';
import { FunnyImagePlaceholder } from './FunnyImagePlaceholer';

<Img src="someurl" alt="some text" ImagePlaceholder={FunnyImagePlaceholder} />
```

### Fallback Image

Provide a link to your fallback image via the fallbackImageUrl prop and the component will refer to it should your intended image fails to load.

```
import { Img } from 'bloody-react-image';

<Img src="someurl" alt="some text" fallbackImageUrl="https://funnyfallbackimage/notafunnyfallbackimage.jpg" />
```

### Accessibility

As mentioned, 4 props are available for your accessibility needs:

- aria-label
- aria-labelledby
- aria-describedby
- long-desc

Just add them to the component if you need them:

```
import { Img } from 'bloody-react-image';

<Img src="someurl" alt="some text" ariaLabel="I am now super accessible" />
```

## What Are Some Other Ways Can I Use This?

There are times when you will require a more elaborate setup for your imagery. Below are suggestions on what you can do for each situation:

### Styling

The component was designed to try to accommodate common use cases for convenience. You can wrap it with whatever element it is that you need and you can use it with SASS, raw CSS, pass in custom styles via the `style` prop and Styled Components. The first 3 use cases is a no-brainer however if you're using Styled Components and would like to use this component in your app, you can try to wrap it around a styled component, something like so:

```
import { Img } from 'bloody-react-image';
import { styled } from 'styled-components';

const StyledImage = styled.div`
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

From here, you know what to do. Pass in your props if you need to, take over the world, etc.

### Overriding styles

Styles can be overridden via the `style` prop. Simply define as props however, `object-fit` and `object-position` are filtered should the browser not support it. This is to prevent undesired rendering results.

### Rendering only if the image is in view

You can try to use Bloody React Image together with another package called [React Visibility Sensor](https://www.npmjs.com/package/react-visibility-sensor) and see if that floats your boat.

# Endword

That is it for now, however, possibly, may be looking into adding a built-in progressive loading mechanism into the component and Jessica, if you're reading this... Call me.
