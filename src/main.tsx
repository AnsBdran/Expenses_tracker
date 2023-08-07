import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store.ts';
import { ThemeProvider } from '@mui/material/styles';
import { responsiveTheme } from './utils/theme.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={responsiveTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
