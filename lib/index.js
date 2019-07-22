import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React from 'react';
import PropTypes from 'prop-types';

var isString = function isString(arg) {
  return Object.prototype.toString.call(arg) === '[object String]';
};
var isNonEmptyString = function isNonEmptyString(arg) {
  return isString(arg) && arg.trim() !== '';
};

var imgProptypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  src: PropTypes.string,
  alt: PropTypes.string,
  fit: PropTypes.string,
  position: PropTypes.string,
  crossOrigin: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  decode: PropTypes.bool,
  decoding: PropTypes.string,
  srcset: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.any]),
  sizes: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.any]),
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  ariaLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  onErrorImage: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  onLoadImage: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  ImagePlaceholder: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  fallbackImageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.any])
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Img =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Img, _React$Component);

  function Img() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Img);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Img)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      imgSrc: void 0,
      isLoading: false,
      isLoaded: false,
      error: void 0
    });

    _defineProperty(_assertThisInitialized(_this), "addOnLoadAndOnErrorHandlersToImage", function (tempImage) {
      if (!tempImage) {
        _this.onImageError(new Error('Invalid image.'));

        return;
      }

      if (_this.props.decode && !!tempImage.decode) {
        tempImage.decode().then(_this.onImageLoad(tempImage), _this.onImageError);
      } else {
        tempImage.onload = _this.onImageLoad(tempImage);
        tempImage.onerror = _this.onImageError;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onImageLoad", function (tempImage) {
      return function () {
        _this.setState(function () {
          return {
            isLoading: false,
            isLoaded: true,
            error: void 0
          };
        }, _this.invokePropsOnload(tempImage));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onImageError", function (error) {
      var errorMsg = error && error.message ? "".concat(error.message) : 'The source image cannot be decoded';

      if (!_this.state.error && !!_this.props.fallbackImageUrl) {
        _this.setState(function () {
          return {
            imgSrc: _this.props.fallbackImageUrl,
            isLoading: true,
            isLoaded: false,
            error: errorMsg
          };
        }, _this.loadTempImage);
      } else {
        _this.setState(function () {
          return {
            imgSrc: void 0,
            isLoading: false,
            isLoaded: false,
            error: void 0
          };
        }, _this.invokePropsOnError);
      }

      _this.onImageError = null;
    });

    _defineProperty(_assertThisInitialized(_this), "invokePropsOnload", function (tempImage) {
      return function () {
        /* istanbul ignore next */
        if (!!_this.props.onload) {
          _this.props.onload(_objectSpread({}, _this.state, {}, _this.getLoadedTempImageDimensions(tempImage)));
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "invokePropsOnError", function () {
      /* istanbul ignore next */
      if (!!_this.props.onerror) {
        _this.props.onerror(_objectSpread({}, _this.state, {
          imageWidth: void 0,
          imageHeight: void 0
        }));
      }
    });

    return _this;
  }

  _createClass(Img, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.state.isLoading && !this.state.isLoaded) {
        this.initImageLoading();
      }
    }
  }, {
    key: "initImageLoading",
    value: function initImageLoading() {
      var _this2 = this;

      this.setState(function () {
        return {
          imgSrc: _this2.imageSourceFromProps,
          isLoading: true,
          isLoaded: false
        };
      }, this.loadTempImage);
    }
  }, {
    key: "createNewImage",
    value: function createNewImage(imgSrc) {
      var tempImage = new Image();
      tempImage.src = imgSrc;
      return tempImage;
    }
  }, {
    key: "loadTempImage",
    value: function loadTempImage() {
      var tempImage = this.createNewImage(this.state.imgSrc);
      this.addOnLoadAndOnErrorHandlersToImage(tempImage);
    }
  }, {
    key: "getLoadedTempImageDimensions",
    value: function getLoadedTempImageDimensions(tempImage) {
      return !!tempImage ? {
        imageWidth: tempImage.width,
        imageHeight: tempImage.height
      } : {
        imageWidth: void 0,
        imageHeight: void 0
      };
    }
  }, {
    key: "imageSizingsToString",
    value: function imageSizingsToString(imageSizings) {
      if (Array.isArray(imageSizings) && imageSizings.length) {
        return imageSizings.join(', ');
      }

      if (isNonEmptyString(imageSizings)) {
        return imageSizings;
      }

      return void 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          alt = _this$props.alt,
          crossOrigin = _this$props.crossOrigin,
          decoding = _this$props.decoding,
          ariaLabel = _this$props.ariaLabel,
          ariaLabelledBy = _this$props.ariaLabelledBy,
          ariaDescribedBy = _this$props.ariaDescribedBy,
          longdesc = _this$props.longdesc,
          onErrorImage = _this$props.onErrorImage,
          onLoadImage = _this$props.onLoadImage,
          ImagePlaceholder = _this$props.ImagePlaceholder,
          _this$props$role = _this$props.role,
          role = _this$props$role === void 0 ? 'img' : _this$props$role;
      var _this$state = this.state,
          imgSrc = _this$state.imgSrc,
          isLoading = _this$state.isLoading,
          isLoaded = _this$state.isLoaded,
          error = _this$state.error;

      if (!this.state.isLoaded && this.state.isLoading && !!ImagePlaceholder) {
        return React.createElement(ImagePlaceholder, {
          isImgLoading: isLoading,
          isImgLoaded: isLoaded,
          isImgError: error
        });
      }

      if (this.isLoadedImage && !this.props.children) {
        return React.createElement("img", {
          className: className,
          src: imgSrc,
          alt: alt,
          crossOrigin: crossOrigin,
          decoding: decoding,
          srcSet: this.imageSrcset,
          sizes: this.imageSizes,
          onError: onErrorImage,
          onLoad: onLoadImage,
          "aria-label": ariaLabel || alt,
          "aria-labelledby": ariaLabelledBy,
          "aria-describedby": ariaDescribedBy,
          longdesc: longdesc,
          style: this.imageStyles
        });
      }

      if (this.isLoadedImage && this.props.children) {
        return React.createElement("div", {
          className: className,
          role: role,
          "aria-label": ariaLabel || alt,
          "aria-describedby": ariaDescribedBy,
          "aria-labelledby": ariaLabelledBy,
          longdesc: longdesc,
          style: this.backgroundImageStyles
        }, this.props.children);
      }

      return null;
    }
  }, {
    key: "supportsObjectFit",
    get: function get() {
      return !!window.CSS && !!CSS.supports && !!CSS.supports('object-fit', 'cover') && !!CSS.supports('object-position', '0 0');
    }
  }, {
    key: "isLoadedImage",
    get: function get() {
      /* istanbul ignore next */
      var _this$state2 = this.state,
          imgSrc = _this$state2.imgSrc,
          isLoaded = _this$state2.isLoaded,
          isLoading = _this$state2.isLoading,
          error = _this$state2.error;
      return !!imgSrc && isLoaded && !isLoading && !error;
    }
  }, {
    key: "imageStyles",
    get: function get() {
      /* istanbul ignore next */
      var _this$props2 = this.props,
          _this$props2$style = _this$props2.style,
          style = _this$props2$style === void 0 ? {} : _this$props2$style,
          _this$props2$fit = _this$props2.fit,
          fit = _this$props2$fit === void 0 ? 'contain' : _this$props2$fit,
          _this$props2$position = _this$props2.position,
          position = _this$props2$position === void 0 ? '50% 50%' : _this$props2$position;

      var objectFit = style.objectFit,
          objectPosition = style.objectPosition,
          styles = _objectWithoutProperties(style, ["objectFit", "objectPosition"]);

      return this.supportsObjectFit ? _objectSpread({}, styles, {
        objectFit: fit,
        objectPosition: position
      }) : _objectSpread({}, styles);
    }
  }, {
    key: "backgroundImageStyles",
    get: function get() {
      /* istanbul ignore next */
      var _this$props3 = this.props,
          _this$props3$fit = _this$props3.fit,
          fit = _this$props3$fit === void 0 ? 'contain' : _this$props3$fit,
          _this$props3$position = _this$props3.position,
          position = _this$props3$position === void 0 ? '50% 50%' : _this$props3$position,
          _this$props3$style = _this$props3.style,
          style = _this$props3$style === void 0 ? {} : _this$props3$style;
      var imgSrc = this.state.imgSrc;
      return _objectSpread({
        display: 'block',
        backgroundImage: "url(\"".concat(imgSrc, "\")"),
        backgroundPosition: position,
        backgroundRepeat: 'no-repeat',
        backgroundSize: fit.replace('fill', '100% 100%').replace('none', 'auto')
      }, style);
    }
  }, {
    key: "imageSrcset",
    get: function get() {
      var srcset = this.imageSizingsToString(this.props.srcset);
      return isNonEmptyString(srcset) ? srcset : void 0;
    }
  }, {
    key: "imageSizes",
    get: function get() {
      var srcset = this.imageSizingsToString(this.props.srcset);
      var sizes = this.imageSizingsToString(this.props.sizes);
      return isNonEmptyString(srcset) && isNonEmptyString(sizes) ? sizes : void 0;
    }
  }, {
    key: "imageSourceFromProps",
    get: function get() {
      return this.state.error ? this.props.fallbackImageUrl : this.props.src;
    }
  }]);

  return Img;
}(React.Component);

_defineProperty(Img, "propTypes", imgProptypes);

export { Img };
