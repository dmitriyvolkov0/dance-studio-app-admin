import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import UserContextProvider from '@components/contexts/User/UserContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#CE5EFF',
    },
    // secondary: {
      // main: green[500],
    // },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);


reportWebVitals();
