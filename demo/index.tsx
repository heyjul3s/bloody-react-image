import React from 'react';
import ReactDOM from 'react-dom';
import Img from '../src/index';
import { Loading } from './loader';

const SM = 'https://source.unsplash.com/random/640x480';
const MD = 'https://source.unsplash.com/random/1024x768';
const LG = 'https://source.unsplash.com/random/1440x600';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Bloody React Image</h1>
        <div
          style={{
            maxWidth: 1440,
            maxHeight: 600,
            width: '100%',
            height: 'auto',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Img
            src={LG}
            alt=""
            delay={300}
            fit="cover"
            ImagePlaceholder={Loading}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
            }}
            srcset={`${SM} 320w, ${MD} 700w, ${LG} 2000w`}
            sizes="(max-width: 2000px) 100vw, 2000px"
          />
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
