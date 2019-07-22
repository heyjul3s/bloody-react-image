import PropTypes from 'prop-types';

export const imgProptypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  src: PropTypes.string,
  alt: PropTypes.string,
  fit: PropTypes.string,
  position: PropTypes.string,
  crossOrigin: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  decode: PropTypes.bool,
  decoding: PropTypes.string,
  srcset: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.any,
  ]),
  sizes: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.any,
  ]),
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  ariaLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  onErrorImage: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  onLoadImage: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  ImagePlaceholder: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  fallbackImageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
};
