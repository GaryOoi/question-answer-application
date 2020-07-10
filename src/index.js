import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from 'app';
import history from 'utils/history';
import 'antd/dist/antd.css';

const MOUNT_NODE = document.getElementById('root');

const initialState = {};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  MOUNT_NODE,
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line import/no-unresolved
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
