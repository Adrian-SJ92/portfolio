import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

console.log(
  '%c🐇 Hola, curioso.\n%cHay un secreto escondido en este portfolio.\nPista: ↑ ↑ ↓ ↓ ← → ← → B A',
  'color:#00d4ff;font-family:monospace;font-size:15px;font-weight:bold;',
  'color:#64748b;font-family:monospace;font-size:12px;line-height:1.8;'
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
