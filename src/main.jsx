import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'; // Don't forget the CSS!
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      {/* Notifications must be inside MantineProvider */}
      <Notifications position="top-right" zIndex={1000} />
      <App />
    </MantineProvider>
  </React.StrictMode>,
)