import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import dotenv from 'dotenv';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Get Google Client ID from environment variables
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Log the client ID (for debugging only, remove in production)
console.log('Google Client ID:', googleClientId);

// Check if client ID exists
if (!googleClientId) {
  console.error('Google Client ID is missing! Check your .env file.');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId || ''}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
