import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/main.scss';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/invoicemanagement/'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
