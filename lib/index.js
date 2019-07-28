import { Component, createElement } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const isString = (arg) => Object.prototype.toString.call(arg) === '[object String]';
const isNonEmptyString = (arg) => isString(arg) && arg.trim() !== '';

class Img extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            imgSrc: '',
            isLoading: false,
            isLoaded: false,
            error: void 0,
        };
        this.addOnLoadAndOnErrorHandlersToImage = (tempImage) => {
            if (!tempImage) {
                this.onImageError(new Error('Invalid image.'));
                return;
            }
            if (this.props.decode && !!tempImage.decode) {
                tempImage.decode().then(this.onImageLoad(tempImage), this.onImageError);
            }
            else {
                tempImage.onload = this.onImageLoad(tempImage);
                tempImage.onerror = this.onImageError;
            }
        };
        this.onImageLoad = (tempImage) => () => {
            this.setState(() => ({
                isLoading: false,
                isLoaded: true,
                error: void 0,
            }), this.invokePropsOnload(tempImage));
        };
        this.onImageError = (error) => {
            const errorMsg = error && error.message
                ? `${error.message}`
                : 'The source image cannot be decoded';
            if (!this.state.error && !!this.props.fallbackImageUrl) {
                this.setState(() => ({
                    imgSrc: this.props.fallbackImageUrl || '',
                    isLoading: true,
                    isLoaded: false,
                    error: errorMsg,
                }), this.loadTempImage);
            }
            else {
                this.setState(() => ({
                    imgSrc: '',
                    isLoading: false,
                    isLoaded: false,
                    error: void 0,
                }), this.invokePropsOnError);
            }
            this.onImageError = null;
        };
        this.invokePropsOnload = (tempImage) => () => {
            /* istanbul ignore next */
            if (!!this.props.onload) {
                this.props.onload(Object.assign({}, this.state, this.getLoadedTempImageDimensions(tempImage)));
            }
        };
        this.invokePropsOnError = () => {
            /* istanbul ignore next */
            if (!!this.props.onerror) {
                this.props.onerror(Object.assign({}, this.state, { imageWidth: void 0, imageHeight: void 0 }));
            }
        };
    }
    get supportsObjectFit() {
        return (!!window.CSS &&
            !!CSS.supports &&
            !!CSS.supports('object-fit', 'cover') &&
            !!CSS.supports('object-position', '0 0'));
    }
    get isLoadedImage() {
        /* istanbul ignore next */
        const { imgSrc, isLoaded, isLoading, error } = this.state;
        return !!imgSrc && isLoaded && !isLoading && !error;
    }
    get imageStyles() {
        /* istanbul ignore next */
        const { style = {}, fit = 'contain', position = '50% 50%', } = this.props;
        const styles = __rest(style, ["objectFit", "objectPosition"]);
        return this.supportsObjectFit
            ? Object.assign({}, styles, { 'object-fit': fit, 'object-position': position }) : Object.assign({}, styles);
    }
    get backgroundImageStyles() {
        /* istanbul ignore next */
        const { fit = 'contain', position = '50% 50%', style = {} } = this.props;
        const { imgSrc } = this.state;
        return Object.assign({ display: 'block', backgroundImage: `url("${imgSrc}")`, backgroundPosition: position, backgroundRepeat: 'no-repeat', backgroundSize: fit.replace('fill', '100% 100%').replace('none', 'auto') }, style);
    }
    get imageSrcset() {
        const { srcset } = this.props;
        return isNonEmptyString(srcset) ? srcset : void 0;
    }
    get imageSizes() {
        const { srcset, sizes } = this.props;
        return isNonEmptyString(srcset) && isNonEmptyString(sizes)
            ? sizes
            : void 0;
    }
    get imageSourceFromProps() {
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
        this.setState(() => ({
            imgSrc: this.imageSourceFromProps,
            isLoading: true,
            isLoaded: false,
        }), this.loadTempImage);
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
    getLoadedTempImageDimensions(tempImage) {
        return !!tempImage
            ? {
                imageWidth: tempImage.width,
                imageHeight: tempImage.height,
            }
            : { imageWidth: void 0, imageHeight: void 0 };
    }
    render() {
        const { className, alt, crossOrigin, decoding, ariaLabel, ariaLabelledBy, ariaDescribedBy, ImagePlaceholder, role = 'img', } = this.props;
        const { imgSrc, isLoading, isLoaded, error } = this.state;
        if (!this.state.isLoaded && this.state.isLoading && !!ImagePlaceholder) {
            return (createElement(ImagePlaceholder, { isImgLoading: isLoading, isImgLoaded: isLoaded, isImgError: error }));
        }
        if (this.isLoadedImage && !this.props.children) {
            return (createElement("img", { className: className, src: imgSrc, alt: alt, crossOrigin: crossOrigin, decoding: decoding, srcSet: this.imageSrcset, sizes: this.imageSizes, "aria-label": ariaLabel || alt, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, style: this.imageStyles }));
        }
        if (this.isLoadedImage && this.props.children) {
            return (createElement("div", { className: className, role: role, "aria-label": ariaLabel || alt, "aria-describedby": ariaDescribedBy, "aria-labelledby": ariaLabelledBy, style: this.backgroundImageStyles }, this.props.children));
        }
        return null;
    }
}

export { Img };
