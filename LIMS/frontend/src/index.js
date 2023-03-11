import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './css/PatientDetailStyles/PatientDetailStyles.css';
import './css/PatientProfileStyles/patient-profile.css';
import './css/BillStyles/bill.css';
import App from './App';
import { PatientContextProvider } from './context/PatientContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PatientContextProvider>
      <App />
    </PatientContextProvider>
  </React.StrictMode>
);
