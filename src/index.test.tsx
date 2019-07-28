import * as React from 'react';
import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Img, ImgState, ImgProps } from './index';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('React Image Engine', () => {
  let wrapper: Enzyme.ReactWrapper<ImgProps, ImgState, Img>;
  let instance: Img;

  const IMG_URL: string = 'https://source.unsplash.com/random';

  const props: ImgProps = {
    className: void 0,
    src: 'https://source.unsplash.com/random',
    alt: '',
    fit: 'contain',
    crossOrigin: void 0,
    srcset: '',
    sizes: '',
    role: void 0,
    ariaLabel: void 0,
    onload: jest.fn(),
    onerror: jest.fn(),
    ImagePlaceholder: () => <div>Image Placeholder</div>,
    position: '50% 50%',
    style: {},
  };

  beforeEach(() => {
    wrapper = mount(<Img {...props} />);
    instance = wrapper.instance() as Img;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Did Mount', () => {
    test('initImageLoading - when image is state.loading is FALSE AND state.loaded is TRUE', () => {
      const spy: jest.SpyInstance = jest.spyOn(instance, 'initImageLoading');

      instance.setState({
        isLoaded: true,
        isLoading: false,
      });

      instance.componentDidMount();

      expect(spy).not.toHaveBeenCalled();
    });

    test('initImageLoading - when image is state.loading is TRUE AND state.loaded is FALSE', () => {
      const spy: jest.SpyInstance = jest.spyOn(instance, 'initImageLoading');

      instance.setState({
        isLoaded: false,
        isLoading: true,
      });

      instance.componentDidMount();

      expect(spy).not.toHaveBeenCalled();
    });

    test('initImageLoading - when image is state.loading is FALSE AND state.loaded is FALSE', () => {
      const spy: jest.SpyInstance = jest.spyOn(instance, 'initImageLoading');

      instance.setState({
        isLoaded: false,
        isLoading: false,
      });

      instance.componentDidMount();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Render', () => {
    test('renders an image placeholder if ImagePlaceholder is defined and when state.loading is TRUE', () => {
      wrapper.setState(() => ({
        isLoaded: false,
        isLoading: true,
      }));

      expect(wrapper.html()).toEqual(`<div>Image Placeholder</div>`);
    });

    test('renders an image when state.loaded is TRUE and when there are NO CHILDREN ', () => {
      wrapper.setState(() => ({
        isLoaded: true,
        isLoading: false,
      }));

      expect(instance.props.children).toBeUndefined;
      expect(wrapper.html()).toEqual(
        `<img src="https://source.unsplash.com/random" alt="" aria-label="">`
      );
    });

    test('renders a background image when state.loaded is TRUE and there ARE CHILDREN', () => {
      wrapper = mount(
        <Img {...props}>
          <h1>Hello World</h1>
        </Img>
      );

      instance = wrapper.instance() as Img;

      wrapper.setState(() => ({
        isLoaded: true,
        isLoading: false,
      }));

      expect(instance.props.children).toBeDefined();
      expect(wrapper.html()).toEqual(
        `<div role="img" aria-label="" style="display: block; background-image: url(https://source.unsplash.com/random); background-position: 50% 50%; background-repeat: no-repeat; background-size: contain;"><h1>Hello World</h1></div>`
      );
    });

    test('does not render anything if no acceptable conditions are met', () => {
      wrapper.setState(() => ({
        isLoaded: false,
        isLoading: false,
        ImagePlaceholder: void 0 as any,
      }));

      expect(wrapper.isEmptyRender()).toBe(true);
      expect(wrapper.html()).toEqual(null);
    });
  });

  test('createNewImage - it creates and returns a HTML image element with src defined', () => {
    const spy = jest.spyOn(instance, 'createNewImage') as any;

    const mockImage = new Image();
    const imgSrc = 'https://source.unsplash.com/random';
    mockImage.src = imgSrc;

    spy(imgSrc);

    expect(spy).toReturnWith(mockImage);
    expect(mockImage.src).toBeDefined();
  });

  describe('addOnLoadAndOnErrorHandlersToImage', () => {
    let wrapper: Enzyme.ReactWrapper;
    let instance: Img;

    beforeEach(() => {
      wrapper = mount(<Img {...props} />);
      instance = wrapper.instance() as Img;
    });

    const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
    const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';

    test('runs image decode if opted in and resolves successfully', () => {
      const img = new Image();
      img.src = LOAD_SUCCESS_SRC;
      img.decode = () => Promise.resolve();

      wrapper.setProps({
        src: LOAD_SUCCESS_SRC,
        decode: true,
      });

      const spy = jest.spyOn(
        instance,
        'addOnLoadAndOnErrorHandlersToImage'
      ) as any;

      spy(img);

      img.decode().then(() => {
        setTimeout(() => {
          expect(wrapper.html()).toEqual(`<img src={${LOAD_SUCCESS_SRC}} />`);
          expect((wrapper.instance() as Img).onImageLoad).toHaveBeenCalledTimes(
            1
          );
        }, 100);
      });
    });

    test('runs image decode and catches error if rejected', () => {
      wrapper.setProps({
        src: LOAD_FAILURE_SRC,
        decode: true,
      });

      const img = new Image();
      img.src = LOAD_FAILURE_SRC;
      img.decode = () => Promise.reject();

      img.decode().catch(() => {
        wrapper.update();
        setTimeout(() => {
          expect(wrapper.html()).toEqual(`<img src={${LOAD_FAILURE_SRC}} />`);
          expect(
            (wrapper.instance() as Img).onImageError
          ).toHaveBeenCalledTimes(1);
        }, 100);
      });
    });

    test('sets onload and onerror handlers instead when props.decode is falsy', () => {
      const img = new Image();
      img.src = LOAD_SUCCESS_SRC;
      img.decode = () => Promise.resolve();

      wrapper = mount(<Img {...props} decode={false} />);

      const spy = jest.spyOn(
        instance,
        'addOnLoadAndOnErrorHandlersToImage'
      ) as any;

      spy(img);

      expect(img.onload).toBeDefined();
      expect(img.onerror).toBeDefined();
    });

    test('sets onload and onerror handlers instead when props.decode is true but img.decode is falsy(eg. not supported by browser)', () => {
      const img = new Image();
      img.src = LOAD_SUCCESS_SRC;
      img.decode = void 0;

      wrapper = mount(<Img {...props} decode={true} />);

      const spy = jest.spyOn(
        instance,
        'addOnLoadAndOnErrorHandlersToImage'
      ) as any;

      spy(img);

      expect(img.onload).toBeDefined();
      expect(img.onerror).toBeDefined();
    });
  });

  test('addOnLoadAndOnErrorHandlersToImage - onImageError is called if image arg is falsy', () => {
    const spy = jest.spyOn(
      instance,
      'addOnLoadAndOnErrorHandlersToImage'
    ) as any;
    const spyOnImageError = jest.spyOn(instance, 'onImageError');
    const expectedErrorMsg = new Error('Invalid image.');

    spy(void 0);

    expect(spyOnImageError).toBeCalledWith(expectedErrorMsg);
    expect(spyOnImageError).toBeCalledTimes(1);
  });

  test('addOnLoadAndOnErrorHandlersToImage - sets state to error state if invalid image argument provided', () => {
    wrapper.setProps({
      fallbackImageUrl: IMG_URL,
    });

    const spy = jest.spyOn(
      instance,
      'addOnLoadAndOnErrorHandlersToImage'
    ) as any;

    spy(void 0);

    expect(wrapper.state().isLoaded).toEqual(false);
    expect(wrapper.state().isLoaded).toEqual(false);
    // * NOTE: state.isLoading will remain true as it attempts to run a 2nd time with fallbackImage
    expect(wrapper.state().isLoading).toEqual(true);
    expect(wrapper.state().error).toBeDefined();

    spy.mockReset();
    spy.mockRestore();
  });

  test('onImageLoad', () => {
    const spy = jest.spyOn(instance, 'onImageLoad') as any;
    const spySetState = jest.spyOn(Img.prototype, 'setState') as any;
    const spyInvokePropsOnload = jest.spyOn(
      instance,
      'invokePropsOnload'
    ) as any;
    const testImage = new Image();
    testImage.src = 'https://source.unsplash.com/random';

    spy(testImage)();

    expect(wrapper.state()).toEqual({
      imgSrc: 'https://source.unsplash.com/random',
      isLoaded: true,
      isLoading: false,
      error: void 0,
    });

    expect(spySetState).toBeCalled();
    expect(spyInvokePropsOnload).toBeCalled();
  });

  test('onImageError - WITH fallback defined AND WITHOUT error', () => {
    wrapper.setProps({
      fallbackImageUrl: IMG_URL,
    });

    const spy = jest.spyOn(instance, 'onImageError') as any;
    const spySetState = jest.spyOn(Img.prototype, 'setState');
    const spyLoadTempImage = jest.spyOn(instance, 'loadTempImage') as any;
    const error = new Error('Image failed to load.');

    wrapper.setState(() => ({
      error: void 0 as any,
    }));

    spy(error);

    expect(wrapper.state()).toEqual({
      imgSrc: IMG_URL,
      isLoaded: false,
      isLoading: true,
      error: error.message,
    });

    expect(spySetState).toBeCalled();
    expect(spyLoadTempImage).toBeCalled();
  });

  test('onImageError - WITH fallback defined BUT WITH error', () => {
    wrapper.setProps({
      fallbackImageUrl: IMG_URL,
    });
    const spy = jest.spyOn(instance, 'onImageError') as any;
    const spySetState = jest.spyOn(Img.prototype, 'setState');
    const spyInvokePropsOnError = jest.spyOn(
      instance,
      'invokePropsOnError'
    ) as any;
    const error = new Error('Image failed to load.');

    wrapper.setState(() => ({
      error: error,
    }));

    spy(error);

    expect(wrapper.state()).toEqual({
      imgSrc: '',
      isLoaded: false,
      isLoading: false,
      error: void 0,
    });

    expect(instance.props.fallbackImageUrl).toBeDefined();
    expect(spySetState).toBeCalled();
    expect(spyInvokePropsOnError).toBeCalled();
  });

  test('onImageError - WITHOUT fallback defined', () => {
    const spy = jest.spyOn(instance, 'onImageError') as any;
    const spySetState = jest.spyOn(Img.prototype, 'setState');
    const spyInvokePropsOnError = jest.spyOn(
      instance,
      'invokePropsOnError'
    ) as any;

    spy();

    expect(wrapper.state()).toEqual({
      imgSrc: '',
      isLoaded: false,
      isLoading: false,
    });

    expect(spySetState).toBeCalled();
    expect(spyInvokePropsOnError).toBeCalled();
  });

  test('props.onload - WITH props.onload defined, invoke props.onload', () => {
    const spy = jest.spyOn(instance, 'invokePropsOnload') as any;
    spy();

    expect(instance.props.onload).toBeDefined();

    setTimeout(() => {
      expect(instance.props.onload).toHaveBeenCalled();
    }, 500);
  });

  test('props.onload - WITH props.onload UNDEFINED', () => {
    wrapper.setProps({
      onload: void 0,
    });

    const spy = jest.spyOn(instance, 'invokePropsOnload') as any;
    spy();

    expect(instance.props.onload).toBeUndefined();
  });

  test('props.onerror - WITH props.onerror defined, invoke props.onerror', () => {
    const spy = jest.spyOn(instance, 'invokePropsOnError') as any;
    spy();

    expect(instance.props.onerror).toBeDefined();

    setTimeout(() => {
      expect(instance.props.onerror).toHaveBeenCalled();
    }, 500);
  });

  test('getLoadedTempImageDimensions - WITHOUT image instance', () => {
    const spy = jest.spyOn(instance, 'getLoadedTempImageDimensions') as any;
    spy();

    expect(spy).toReturnWith({
      imageWidth: void 0,
      imageHeight: void 0,
    });
  });

  test('getLoadedTempImageDimensions - WITH image instance', () => {
    const spy = jest.spyOn(instance, 'getLoadedTempImageDimensions') as any;
    const mockTempImage = new Image();
    mockTempImage.width = 100;
    mockTempImage.height = 100;

    spy(mockTempImage);

    expect(spy).toReturnWith({
      imageWidth: mockTempImage.width,
      imageHeight: mockTempImage.height,
    });
  });

  test('supportsObjectFit - WITHOUT window.CSS.supports', () => {
    expect(instance.supportsObjectFit).toEqual(false);
  });

  test('supportsObjectFit - WITH window.CSS.supports', () => {
    const mockSupports = jest.fn().mockImplementation(() => true);

    (window as any).CSS = {
      supports: mockSupports,
    };

    expect(instance.supportsObjectFit).toEqual(true);
    mockSupports.mockReset();
  });

  test('isLoadedImage - when state.isLoading or has error', () => {
    expect(instance.isLoadedImage).toEqual(false);
  });

  test('isLoadedImage - when state.isLoaded and not state.isLoading and no error', () => {
    wrapper.setState({
      isLoaded: true,
      isLoading: false,
      error: void 0,
    });

    expect(instance.isLoadedImage).toEqual(true);
  });

  test('imageStyles - when NOT supportsObjectFit', () => {
    expect(instance.imageStyles).toEqual({});
  });

  test('imageStyles - when supportsObjectFit', () => {
    const mockSupports = jest.fn().mockImplementation(() => true);

    (window as any).CSS = {
      supports: mockSupports,
    };

    expect(instance.imageStyles).toEqual({
      objectFit: 'contain',
      objectPosition: '50% 50%',
    });
  });

  test('backgroundImageStyles - WITH default style values', () => {
    expect(instance.backgroundImageStyles).toEqual({
      backgroundImage: 'url("https://source.unsplash.com/random")',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      display: 'block',
    });
  });

  test('backgroundImageStyles - WITH props.style', () => {
    wrapper.setProps({
      style: {
        display: 'flex',
        backgroundSize: 'cover',
      },
    });

    expect(instance.backgroundImageStyles).toEqual({
      backgroundImage: 'url("https://source.unsplash.com/random")',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
    });
  });

  test('imageSrcset', () => {
    expect(instance.imageSrcset).toEqual(undefined);

    wrapper.setProps({
      srcset: 'elva-fairy-320w.jpg 320w, elva-fairy-480w.jpg 480w',
    });

    expect(instance.imageSrcset).toEqual(instance.props.srcset);
  });

  test('imageSizes - WITHOUT props.srcset AND props.sizes', () => {
    expect(instance.imageSizes).toEqual(undefined);
  });

  test('imageSizes - WITHOUT props.srcset BUT WITH props.sizes', () => {
    wrapper.setProps({
      sizes: '(max-width: 600px) 200px, 50vw',
    });

    expect(instance.imageSizes).toEqual(undefined);
  });

  test('imageSizes - WITH props.srcset AND props.sizes', () => {
    wrapper.setProps({
      srcset: 'elva-fairy-320w.jpg 320w, elva-fairy-480w.jpg 480w',
      sizes: '(max-width: 600px) 200px, 50vw',
    });

    expect(instance.imageSizes).toEqual(instance.props.sizes);
  });

  test('imageSourceFromProps - WITH state.error, uses props.fallbackImageUrl', () => {
    wrapper.setProps({
      fallbackImageUrl: 'https://source.unsplash.com/random/200x200',
    });

    wrapper.setState({
      error: new Error('An unexpected error has occurred.'),
    });

    expect(instance.imageSourceFromProps).toEqual(
      instance.props.fallbackImageUrl
    );
  });

  test('imageSourceFromProps - WITHOUT state.error, uses props.imgSrc', () => {
    wrapper.setState({
      error: void 0,
    });

    expect(instance.imageSourceFromProps).toEqual(instance.props.src);
  });
});