import React from 'react';
import * as utils from './utils';
import { imgProptypes } from './index.propTypes';

export class Img extends React.Component {
  static propTypes = imgProptypes;

  state = {
    imgSrc: void 0,
    isLoading: false,
    isLoaded: false,
    error: void 0,
  };

  get supportsObjectFit() {
    return (
      !!window.CSS &&
      !!CSS.supports &&
      !!CSS.supports('object-fit', 'cover') &&
      !!CSS.supports('object-position', '0 0')
    );
  }

  get isLoadedImage() {
    /* istanbul ignore next */
    const { imgSrc, isLoaded, isLoading, error } = this.state;
    return !!imgSrc && isLoaded && !isLoading && !error;
  }

  get imageStyles() {
    /* istanbul ignore next */
    const { style = {}, fit = 'contain', position = '50% 50%' } = this.props;
    const { objectFit, objectPosition, ...styles } = style;

    return this.supportsObjectFit
      ? {
          ...styles,
          objectFit: fit,
          objectPosition: position,
        }
      : { ...styles };
  }

  get backgroundImageStyles() {
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

  get imageSrcset() {
    const srcset = this.imageSizingsToString(this.props.srcset);
    return utils.isNonEmptyString(srcset) ? srcset : void 0;
  }

  get imageSizes() {
    const srcset = this.imageSizingsToString(this.props.srcset);
    const sizes = this.imageSizingsToString(this.props.sizes);

    return utils.isNonEmptyString(srcset) && utils.isNonEmptyString(sizes)
      ? sizes
      : void 0;
  }

  get imageSourceFromProps() {
    return this.state.error ? this.props.fallbackImageUrl : this.props.src;
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

  createNewImage(imgSrc) {
    let tempImage = new Image();
    tempImage.src = imgSrc;
    return tempImage;
  }

  loadTempImage() {
    const tempImage = this.createNewImage(this.state.imgSrc);
    this.addOnLoadAndOnErrorHandlersToImage(tempImage);
  }

  addOnLoadAndOnErrorHandlersToImage = tempImage => {
    if (!tempImage) {
      this.onImageError(new Error('Invalid image.'));
      return;
    }

    if (this.props.decode && !!tempImage.decode) {
      tempImage.decode().then(this.onImageLoad(tempImage), this.onImageError);
    } else {
      tempImage.onload = this.onImageLoad(tempImage);
      tempImage.onerror = this.onImageError;
    }
  };

  onImageLoad = tempImage => () => {
    this.setState(
      () => ({
        isLoading: false,
        isLoaded: true,
        error: void 0,
      }),
      this.invokePropsOnload(tempImage)
    );
  };

  onImageError = error => {
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
          imgSrc: void 0,
          isLoading: false,
          isLoaded: false,
          error: void 0,
        }),
        this.invokePropsOnError
      );
    }

    this.onImageError = null;
  };

  invokePropsOnload = tempImage => () => {
    /* istanbul ignore next */
    if (!!this.props.onload) {
      this.props.onload({
        ...this.state,
        ...this.getLoadedTempImageDimensions(tempImage),
      });
    }
  };

  getLoadedTempImageDimensions(tempImage) {
    return !!tempImage
      ? {
          imageWidth: tempImage.width,
          imageHeight: tempImage.height,
        }
      : { imageWidth: void 0, imageHeight: void 0 };
  }

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

  imageSizingsToString(imageSizings) {
    if (Array.isArray(imageSizings) && imageSizings.length) {
      return imageSizings.join(', ');
    }

    if (utils.isNonEmptyString(imageSizings)) {
      return imageSizings;
    }

    return void 0;
  }

  render() {
    const {
      className,
      alt,
      crossOrigin,
      decoding,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      longdesc,
      onErrorImage,
      onLoadImage,
      ImagePlaceholder,
      role = 'img',
    } = this.props;

    const { imgSrc, isLoading, isLoaded, error } = this.state;

    if (!this.state.isLoaded && this.state.isLoading && !!ImagePlaceholder) {
      return (
        <ImagePlaceholder
          isImgLoading={isLoading}
          isImgLoaded={isLoaded}
          isImgError={error}
        />
      );
    }

    if (this.isLoadedImage && !this.props.children) {
      return (
        <img
          className={className}
          src={imgSrc}
          alt={alt}
          crossOrigin={crossOrigin}
          decoding={decoding}
          srcSet={this.imageSrcset}
          sizes={this.imageSizes}
          onError={onErrorImage}
          onLoad={onLoadImage}
          aria-label={ariaLabel || alt}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          longdesc={longdesc}
          style={this.imageStyles}
        />
      );
    }

    if (this.isLoadedImage && this.props.children) {
      return (
        <div
          className={className}
          role={role}
          aria-label={ariaLabel || alt}
          aria-describedby={ariaDescribedBy}
          aria-labelledby={ariaLabelledBy}
          longdesc={longdesc}
          style={this.backgroundImageStyles}
        >
          {this.props.children}
        </div>
      );
    }

    return null;
  }
}
