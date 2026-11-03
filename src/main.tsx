import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { setUpPreviewMode } from './prototype/preview';
import './index.css';

setUpPreviewMode();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
