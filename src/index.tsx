import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './App';

/* Automatically re-trigger cypress tests on load */
if (process.env.REACT_APP_ENV === 'test') {
  const btn: HTMLButtonElement | null = window.top.document.querySelector(
    '.reporter .restart',
  );
  if (btn) {
    btn.click();
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
