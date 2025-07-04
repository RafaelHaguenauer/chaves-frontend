import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { RegisterProvider } from './contexts/RegisterContext'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RegisterProvider> 
        <AppRoutes />
      </RegisterProvider>
    </AuthProvider>
  </React.StrictMode>
);
