import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react'; // Import ClerkProvider
import './index.css';
import App from './App.jsx';

const clerkFrontendApi = 'https://viable-urchin-4802.clerk.accounts.dev';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider frontendApi={clerkFrontendApi}> {/* Wrap with ClerkProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);