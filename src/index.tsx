import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { getInitialState } from './lib';
import { config } from './config';

getInitialState().then((initialState) => {
  ReactDOM.render(
    <React.StrictMode>
      <App initialState={initialState} config={config} />
    </React.StrictMode>,
    document.getElementById('root'),
  );
});
