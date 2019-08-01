import * as React from 'react';
import * as utils from './utils';

export type ImgProps = {
  alt: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  className?: string;
  crossOrigin?: CrossOriginType;
  decode?: boolean;
  decoding?: DecodingType;
  fallbackImageUrl?: string;
  fit?: string;
  ImagePlaceholder?: React.ElementType<ImagePlaceholderProps>;
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
  isLoaded: boolean;
  error: Error | string | undefined;
};

export type ImagePlaceholderProps = {
  isImgLoading: boolean;
  isImgLoaded: boolean;
  isImgError: Error | string | undefined;
};

export type CrossOriginType = 'anonymous' | 'use-credentials';

export type DecodingType = 'async' | 'sync' | 'auto';

export type ImageDimensions = {
  imageWidth: number | undefined;
  imageHeight: number | undefined;
};

export type PropsOnloadArg = ImgState & ImageDimensions;

export class Img extends React.Component<ImgProps, ImgState> {
  image: HTMLImageElement;

  state: ImgState = {
    imgSrc: '',
    isLoading: false,
    isLoaded: false,
    error: void 0,
  };

  get supportsObjectFit(): boolean {
    return (
      !!(window as any).CSS &&
      !!CSS.supports &&
      !!CSS.supports('object-fit', 'cover') &&
      !!CSS.supports('object-position', '0 0')
    );
  }

  get isLoadImage(): boolean {
    /* istanbul ignore next */
    const { imgSrc, error }: ImgState = this.state;
    return !!imgSrc && !error;
  }

  get imageStyles() {
    /* istanbul ignore next */
    const {
      style = {},
      fit = 'contain',
      position = '50% 50%',
    }: ImgProps = this.props;

    const { objectFit, objectPosition, ...styles }: React.CSSProperties = style;

    return this.supportsObjectFit
      ? {
          objectFit: fit,
          objectPosition: position,
          ...styles,
        }
      : { ...styles };
  }

  get backgroundImageStyles(): React.CSSProperties {
    /* istanbul ignore next */
    const { fit = 'contain', position = '50% 50%', style = {} } = this.props;
    const { imgSrc } = this.state;

    return {
      display: 'block',
      backgroundImage: `url("${imgSrc}")`,
      backgroundPosition: position,
      backgroundRepeat: 'no-repeat',
      backgroundSize: fit.replace('fill', '100% 100%').replace('none', 'auto'),
      ...style,
    };
  }

  get imageSrcset(): string | undefined {
    const { srcset } = this.props;
    return utils.isNonEmptyString(srcset) ? srcset : void 0;
  }

  get imageSizes(): string | undefined {
    const { srcset, sizes } = this.props;
    return utils.isNonEmptyString(srcset) && utils.isNonEmptyString(sizes)
      ? sizes
      : void 0;
  }

  get imageSourceFromProps(): string {
    return this.state.error && !!this.props.fallbackImageUrl
      ? this.props.fallbackImageUrl
      : this.props.src;
  }

  componentDidMount() {
    if (!this.state.isLoading && !this.state.isLoaded) {
      this.initImageLoading();
    }
  }

  initImageLoading() {
    this.setState(
      () => ({
        imgSrc: this.imageSourceFromProps,
        isLoading: true,
        isLoaded: false,
      }),
      this.loadTempImage
    );
  }

  createNewImage = (imgSrc: string) => {
    this.image = new Image();
    this.image.src = imgSrc;
  };

  loadTempImage() {
    this.createNewImage(this.state.imgSrc);
    this.addOnLoadAndOnErrorHandlersToImage();
  }

  addOnLoadAndOnErrorHandlersToImage = () => {
    if (!this.image) {
      this.onImageError(new Error('Invalid image.'));
      return;
    }

    if (this.props.decode && !!this.image.decode) {
      this.image.decode().then(this.onImageLoad, this.onImageError);
    } else {
      this.image.onload = this.onImageLoad;
      this.image.onerror = this.onImageError;
    }
  };

  onImageLoad = () => {
    this.setState(
      () => ({
        isLoading: false,
        isLoaded: true,
        error: void 0,
      }),
      this.invokePropsOnload
    );
  };

  onImageError = (error: any) => {
    const errorMsg =
      error && error.message
        ? `${error.message}`
        : 'The source image cannot be decoded';

    if (!this.state.error && !!this.props.fallbackImageUrl) {
      this.setState(
        () => ({
          imgSrc: this.props.fallbackImageUrl,
          isLoading: true,
          isLoaded: false,
          error: errorMsg,
        }),
        this.loadTempImage
      );
    } else {
      this.setState(
        () => ({
          imgSrc: '',
          isLoading: false,
          isLoaded: false,
          error: void 0,
        }),
        this.invokePropsOnError
      );
    }

    this.onImageError = null;
  };

  invokePropsOnload = () => {
    /* istanbul ignore next */
    if (!!this.props.onload) {
      this.props.onload({
        ...this.state,
        ...this.getLoadedTempImageDimensions(),
      });
    }
  };

  getLoadedTempImageDimensions = (): ImageDimensions => {
    return {
      imageWidth: this.image.width,
      imageHeight: this.image.height,
    };
  };

  invokePropsOnError = () => {
    /* istanbul ignore next */
    if (!!this.props.onerror) {
      this.props.onerror({
        ...this.state,
        imageWidth: void 0,
        imageHeight: void 0,
      });
    }
  };

  render() {
    const {
      className,
      alt,
      crossOrigin,
      decoding,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ImagePlaceholder,
      role = 'img',
    } = this.props;

    const { imgSrc, isLoading, isLoaded, error } = this.state;

    if (!isLoaded && !isLoading && !!error) {
      return null;
    }

    return (
      <React.Fragment>
        {!!ImagePlaceholder && (
          <ImagePlaceholder
            isImgLoading={isLoading}
            isImgLoaded={isLoaded}
            isImgError={error}
          />
        )}

        {this.isLoadImage && !this.props.children && (
          <img
            className={className}
            src={imgSrc}
            alt={alt}
            crossOrigin={crossOrigin}
            decoding={decoding}
            srcSet={this.imageSrcset}
            sizes={this.imageSizes}
            aria-label={ariaLabel || alt}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            style={this.imageStyles as React.CSSProperties}
          />
        )}

        {this.isLoadImage && this.props.children && (
          <div
            className={className}
            role={role}
            aria-label={ariaLabel || alt}
            aria-describedby={ariaDescribedBy}
            aria-labelledby={ariaLabelledBy}
            style={this.backgroundImageStyles}
          >
            {this.props.children}
          </div>
        )}
      </React.Fragment>
    );
  }
}
