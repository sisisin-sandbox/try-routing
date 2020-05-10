import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { DefaultTypelessProvider } from 'typeless';

ReactDOM.render(
  <DefaultTypelessProvider>
    <App></App>
  </DefaultTypelessProvider>,
  document.getElementById('app'),
);
