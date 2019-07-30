import * as React from 'react';

type LoadingProps = {
  isImgLoaded: boolean;
};

export const Loading: React.FunctionComponent<LoadingProps> = props => {
  return (
    <div
      className="loader"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '400px',
        height: '400px',
        background: 'red',
        display: 'block',
        transition: 'opacity 300ms ease-out',
        opacity: props.isImgLoaded ? 0 : 1,
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
        <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 15 ; 0 -15; 0 15"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 10 ; 0 -10; 0 10"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
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
};
