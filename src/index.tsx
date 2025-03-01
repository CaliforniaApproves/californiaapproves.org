import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import React from 'react';
const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
