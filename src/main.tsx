import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import posthog from 'posthog-js';

// Initialize PostHog (EU instance)
posthog.init('phc_wQOC4GGisd0h37WXZ4WAIvRyRH2aUfpC5OgbSRdGeBh', {
  api_host: 'https://eu.i.posthog.com',
});

// Track pageview
posthog.capture('$pageview');

// Only render once
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
