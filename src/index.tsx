import * as React from 'react';

export type ImgProps = {
  alt?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  className?: string;
  crossOrigin?: CrossOriginType;
  delay?: number;
  decode?: boolean;
  decoding?: DecodingType;
  fallbackImageUrl?: string;
  fit?: string;
  ImagePlaceholder?:
    | React.ElementType<ImagePlaceholderProps>
    | React.ComponentClass
    | React.FunctionComponent;
  onload?: (imageState: PropsOnloadArg) => void;
  onerror?: (imageState: PropsOnloadArg) => void;
  position?: string;
  role?: string;
  sizes?: string;
  style?: React.CSSProperties;
  src: string;
  srcset?: string;
};

export type ImgState = {
  imgSrc: string;
  isLoading: boolean;
  error: Error | string | undefined;
};

export type ImagePlaceholderProps = {
  isImgLoading: boolean;
  isImgError: Error | string | undefined;
};

export type CrossOriginType = 'anonymous' | 'use-credentials';

export type DecodingType = 'async' | 'sync' | 'auto';

export type PropsOnloadArg = ImgState & ImageDimensions;

export type ImageDimensions = {
  imageWidth: number | undefined;
  imageHeight: number | undefined;
};

const Img: React.FunctionComponent<ImgProps> = ({
  children,
  className,
  alt,
  crossOrigin,
  decode,
  decoding,
  delay,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  fallbackImageUrl,
  ImagePlaceholder,
  role = 'img',
  style = {},
  fit = 'contain',
  onload,
  onerror,
  position = '50% 50%',
  src,
  srcset,
  sizes,
}) => {
  let image: HTMLImageElement;

  const [imgSrc, setImgSrc] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(void 0);

  React.useEffect(() => {
    initImageLoading();
  }, []);

  React.useEffect(() => {
    if (isLoading) {
      loadTempImage();
    }
  }, [imgSrc]);

  React.useEffect(() => {
    if (!!image) {
      invokePropsOnload();
    }
  }, [isLoading, image]);

  React.useEffect(() => {
    invokePropsOnError();
  }, [error]);

  const isLoadImage = !!imgSrc && !error;

  const { objectFit, objectPosition, ...styles }: React.CSSProperties = style;

  const supportsObjectFit =
    !!(window as any).CSS &&
    !!CSS.supports &&
    !!CSS.supports('object-fit', 'cover') &&
    !!CSS.supports('object-position', '0 0');

  const imageStyles = supportsObjectFit
    ? { objectFit: fit, objectPosition: position, ...styles }
    : { ...styles };

  const backgroundImageStyles: React.CSSProperties = {
    display: 'block',
    backgroundImage: `url("${imgSrc}")`,
    backgroundPosition: position,
    backgroundRepeat: 'no-repeat',
    backgroundSize: fit.replace('fill', '100% 100%').replace('none', 'auto'),
    ...style,
  };

  const imageSrcset: string | undefined = isNonEmptyString(srcset)
    ? srcset
    : void 0;

  const imageSizes: string | undefined =
    isNonEmptyString(srcset) && isNonEmptyString(sizes) ? sizes : void 0;

  const getImgSrc = error && !!fallbackImageUrl ? fallbackImageUrl : src;

  const initImageLoading = () => {
    setImgSrc(getImgSrc);
    setIsLoading(true);
  };

  const loadTempImage = () => {
    createNewImage(imgSrc);
    addOnLoadAndOnErrorHandlersToImage(image);
  };

  const addOnLoadAndOnErrorHandlersToImage = (image: HTMLImageElement) => {
    if (!image) {
      throw new Error(
        'Unable to process image. Invalid image and or attributes provided.'
      );
    }

    if (decode && !!image.decode) {
      image.decode().then(onImageLoad, onImageError);
    } else {
      image.onload = onImageLoad;
      image.onerror = onImageError;
    }
  };

  const createNewImage = (src: string) => {
    image = new Image();
    image.src = src;
  };

  let onImageError = () => {
    if (!!fallbackImageUrl) {
      setImgSrc(fallbackImageUrl);
      setIsLoading(true);
    }

    setError(
      'Unable to process image. Attempting to use fallback image for resolution.'
    );

    onImageError = null;
  };

  const invokePropsOnError = () => {
    if (!!onerror) {
      onerror({
        imgSrc,
        isLoading,
        error,
        imageWidth: void 0,
        imageHeight: void 0,
      });
    }
  };

  const onImageLoad = () => {
    !!delay ? setImageLoadedStateWithDelay() : setImageLoadedState();
  };

  const setImageLoadedState = () => {
    setIsLoading(false);
    setError(void 0);
  };

  const setImageLoadedStateWithDelay = () => {
    setTimeout(() => {
      setImageLoadedState();
    }, delay);
  };

  const invokePropsOnload = () => {
    if (!!onload) {
      onload({
        imgSrc,
        isLoading,
        error,
        imageWidth: image.width,
        imageHeight: image.height,
      });
    }
  };

  if (!isLoading && !!error) {
    return null;
  }

  return (
    <React.Fragment>
      {!!ImagePlaceholder && isLoading && (
        <ImagePlaceholder isImgLoading={isLoading} isImgError={error} />
      )}

      {isLoadImage && !children && (
        <img
          className={className}
          src={imgSrc}
          alt={alt}
          crossOrigin={crossOrigin}
          decoding={decoding}
          srcSet={imageSrcset}
          sizes={imageSizes}
          aria-label={ariaLabel || alt}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          style={imageStyles as React.CSSProperties}
        />
      )}

      {isLoadImage && children && (
        <div
          className={className}
          role={role}
          aria-label={ariaLabel || alt}
          aria-describedby={ariaDescribedBy}
          aria-labelledby={ariaLabelledBy}
          style={backgroundImageStyles}
        >
          {children}
        </div>
      )}
    </React.Fragment>
  );
};

export const isString = (arg: any): boolean =>
  Object.prototype.toString.call(arg) === '[object String]';

export const isNonEmptyString = (arg: any): boolean =>
  isString(arg) && arg.trim() !== '';

export default Img;
