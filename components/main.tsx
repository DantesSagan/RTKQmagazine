import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import store from './app/store/store';

import './index.css';

// Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element | DocumentFragment'.
//   Type 'null' is not assignable to type 'Element | DocumentFragment'.ts(2345)
// to fixed this create variable with adding at the end of assignment  - ! - operator

const portalDiv = document.getElementById('root')!;

ReactDOM.createRoot(portalDiv).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
