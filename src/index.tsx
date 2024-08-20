// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './UserContext'; // Import UserProvider

ReactDOM.render(
  <React.StrictMode>
    <UserProvider> {/* Wrap your application with UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
