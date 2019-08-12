import * as React from 'react';

type LoadingProps = {
  isImgLoaded: boolean;
};

type LoadingState = {
  transitionComplete: boolean;
};

export class Loading extends React.Component<LoadingProps, LoadingState> {
  state = {
    transitionComplete: false,
  };

  render() {
    if (this.state.transitionComplete) {
      return null;
    }

    return (
      <div
        className="loader"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          maxWidth: 1440,
          maxHeight: 600,
          background: '#595959',
          transition: 'opacity 400ms ease-out',
          opacity: this.props.isImgLoaded ? 0 : 1,
        }}
        onAnimationEnd={() => {
          setTimeout(() => {
            this.setState({ transitionComplete: true });
          }, 600);
        }}
      >
        <svg
          version="1.1"
          id="L5"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 0 0"
        >
          <circle fill="#fff" stroke="none" cx="40" cy="25" r="3">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 15 ; 0 -15; 0 15"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle fill="#fff" stroke="none" cx="50" cy="25" r="3">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 10 ; 0 -10; 0 10"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle fill="#fff" stroke="none" cx="60" cy="25" r="3">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>
      </div>
    );
  }
}
