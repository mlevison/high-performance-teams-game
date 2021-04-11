import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { getInitialState } from './lib';
import { config } from './config';

if (
  process.env.NODE_ENV !== 'production' &&
  window.location.pathname.match(/^\/results/)
) {
  import('./simulate/ResultsApp').then(({ default: App }) => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  });
} else {
  getInitialState().then((initialState) => {
    ReactDOM.render(
      <React.StrictMode>
        <App initialState={initialState} config={config} />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  });
}
