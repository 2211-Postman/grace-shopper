import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store.js';
import App from './app/App';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#90caf9',
      dark: '#1976d2'
    },
    secondary: {
      main: '#b0bec5',
      dark: '#607d8b'
    },
  },
});

const root = createRoot(document.getElementById('app'));

root.render(
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Provider>
  </Router>
);
