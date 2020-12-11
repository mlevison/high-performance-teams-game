import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './App';
import { getInitialState } from './lib';

getInitialState().then((initialState) => {
  ReactDOM.render(
    <React.StrictMode>
      <App initialState={initialState} />
    </React.StrictMode>,
    document.getElementById('root'),
  );
});
