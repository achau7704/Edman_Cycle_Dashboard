import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from "react-redux"

const store = configureStore({
  reducer: {}
})

// let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
